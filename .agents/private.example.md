# Private context (example)

This is the only private-context file that is committed. It documents the convention. Do not put real private content here.

## How to use

1. Copy this file locally to `.agents/private/project-context.md`.
2. `.agents/private/` is ignored by git, so nothing inside it is committed.
3. Use the copied file for research, inspiration sources, design references, moodboards, raw prompts, creative direction, private notes, and unfinished thinking.
4. Never commit the copied private file or anything else under `.agents/private/`.

## Why

The repository is the polished, public artifact. The working brain stays local and ignored. Keeping these separate lets agents pick up sanitized context from `AGENTS.md` and `docs/agent-handoff.md` without exposing private material.
