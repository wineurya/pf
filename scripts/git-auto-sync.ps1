<#
.SYNOPSIS
  Commit + pull --rebase + push on a timer (optional) for multi-machine Git workflows.

.DESCRIPTION
  Not a substitute for manual commits when you want clean history.
  Can create frequent "chore: auto-sync" commits. Stop with Ctrl+C when using -Watch.

.EXAMPLE
  .\scripts\git-auto-sync.ps1
  One sync now (pull, commit if dirty, push).

.EXAMPLE
  .\scripts\git-auto-sync.ps1 -Watch
  Repeat every 300 seconds (5 minutes).

.EXAMPLE
  .\scripts\git-auto-sync.ps1 -Watch -IntervalSeconds 120
  Repeat every 2 minutes.

  Task Scheduler: run every 5 minutes:
  Program: powershell.exe
  Arguments: -NoProfile -ExecutionPolicy Bypass -File "C:\path\to\pf\scripts\git-auto-sync.ps1"
#>
param(
  [string]$RepoPath = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path,
  [int]$IntervalSeconds = 300,
  [switch]$Watch
)

# Git writes progress to stderr; do not treat that as a terminating error.
$ErrorActionPreference = "Continue"

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

    $pullOut = git pull --rebase origin $branch 2>&1 | Out-String
    if ($LASTEXITCODE -ne 0) {
      Write-Warning "git pull --rebase failed (conflicts or network). Fix manually, then run again.`n$pullOut"
      exit 1
    }

    $dirty = git status --porcelain
    if ($dirty) {
      git add -A
      $msg = "chore: auto-sync $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
      git commit -m $msg
      if ($LASTEXITCODE -ne 0) {
        throw "git commit failed."
      }
    }

    $pushOut = git push origin $branch 2>&1 | Out-String
    if ($LASTEXITCODE -ne 0) {
      Write-Warning "git push failed.`n$pushOut"
      exit 1
    }

    Write-Host "[auto-sync] OK $branch @ $(Get-Date -Format 'HH:mm:ss')"
  }
  finally {
    Pop-Location
  }
}

if ($Watch) {
  Write-Host "Watching every $IntervalSeconds s. Ctrl+C to stop. Repo: $RepoPath"
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
