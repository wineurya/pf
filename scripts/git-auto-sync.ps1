<#
.SYNOPSIS
  Pull, commit, or push only when something actually needs to sync.

.DESCRIPTION
  Exits silently when there are no uncommitted changes and the branch matches origin
  (nothing to pull, nothing to push). No empty runs, no pointless pushes.

  With -Watch, the timer still fires, but each iteration is a no-op when idle.

.EXAMPLE
  .\scripts\git-auto-sync.ps1
  One sync now.

.EXAMPLE
  .\scripts\git-auto-sync.ps1 -Watch
  Repeat every 300 seconds (5 minutes).

.EXAMPLE
  .\scripts\git-auto-sync.ps1 -Watch -IntervalSeconds 120

  Task Scheduler: run every 5 minutes (same as one-shot):
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "C:\path\to\pf\scripts\git-auto-sync.ps1"
#>
param(
  [string]$RepoPath = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path,
  [int]$IntervalSeconds = 300,
  [switch]$Watch
)

$ErrorActionPreference = "Continue"

function Get-AheadBehind {
  param([string]$Branch)
  $line = (git rev-list --left-right --count "HEAD...origin/$Branch" 2>&1 | Out-String).Trim()
  if ($LASTEXITCODE -ne 0) {
    return $null
  }
  $parts = $line -split '\s+'
  if ($parts.Count -lt 2) {
    return $null
  }
  return @{
    Ahead  = [int]$parts[0]
    Behind = [int]$parts[1]
  }
}

function Invoke-OneSync {
  param([string]$Path)
  Push-Location $Path
  try {
    if (-not (Test-Path .git)) {
      throw "Not a git repo: $Path"
    }

    $branch = (git rev-parse --abbrev-ref HEAD).Trim()
    if ($branch -eq "HEAD") {
      throw "Detached HEAD; checkout a branch first."
    }

    git fetch origin 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
      Write-Warning "git fetch failed (network?)."
      exit 1
    }

    $ab = Get-AheadBehind -Branch $branch
    if ($null -eq $ab) {
      Write-Warning "Could not compare to origin/$branch (set upstream or push branch once)."
      exit 1
    }

    $dirty = git status --porcelain

    # Idle: nothing uncommitted and fully synced with origin — do nothing (no pull/push noise).
    if (-not $dirty -and $ab.Ahead -eq 0 -and $ab.Behind -eq 0) {
      return
    }

    if ($ab.Behind -gt 0) {
      $pullOut = git pull --rebase origin $branch 2>&1 | Out-String
      if ($LASTEXITCODE -ne 0) {
        Write-Warning "git pull --rebase failed (conflicts or network). Fix manually.`n$pullOut"
        exit 1
      }
    }

    $dirty = git status --porcelain
    $ab = Get-AheadBehind -Branch $branch
    if ($null -eq $ab) {
      exit 1
    }

    if (-not $dirty -and $ab.Ahead -eq 0 -and $ab.Behind -eq 0) {
      return
    }

    if (-not $dirty -and $ab.Ahead -gt 0) {
      $pushOut = git push origin $branch 2>&1 | Out-String
      if ($LASTEXITCODE -ne 0) {
        Write-Warning "git push failed.`n$pushOut"
        exit 1
      }
      Write-Host "[auto-sync] pushed $branch @ $(Get-Date -Format 'HH:mm:ss')"
      return
    }

    if ($dirty) {
      git add -A
      $msg = "chore: auto-sync $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
      git commit -m $msg 2>&1 | Out-Null
      if ($LASTEXITCODE -ne 0) {
        Write-Warning "git commit failed (nothing staged?)."
        exit 1
      }
    }

    $ab = Get-AheadBehind -Branch $branch
    if ($null -eq $ab) {
      exit 1
    }
    if ($ab.Ahead -gt 0) {
      $pushOut = git push origin $branch 2>&1 | Out-String
      if ($LASTEXITCODE -ne 0) {
        Write-Warning "git push failed.`n$pushOut"
        exit 1
      }
    }

    Write-Host "[auto-sync] synced $branch @ $(Get-Date -Format 'HH:mm:ss')"
  }
  finally {
    Pop-Location
  }
}

if ($Watch) {
  Write-Host "Watching every $IntervalSeconds s (no-op when idle). Ctrl+C to stop. Repo: $RepoPath"
  while ($true) {
    try {
      Invoke-OneSync -Path $RepoPath
    }
    catch {
      Write-Warning $_
    }
    Start-Sleep -Seconds $IntervalSeconds
  }
}
else {
  Invoke-OneSync -Path $RepoPath
}
