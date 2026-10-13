# Gumroad skill (official, vendored)

`SKILL.md` is an unedited copy of the official skill from the Gumroad CLI:

- Source: https://github.com/antiwork/gumroad-cli/blob/main/skills/gumroad/SKILL.md
- Commit: `9fe672bfc3769a81a65a5955ed041f2dbf7d25de` (2026-10-12)
- License: MIT, copyright Gumroad, Inc. (see `LICENSE`)

The installed CLI (`gumroad version 2026.10.02`) prints almost the same file with `gumroad skill`. The only difference is one paragraph about login retries that's newer than the release.

Don't edit `SKILL.md` here. Project rules go in the project's own skill, so this copy can be replaced cleanly. To refresh it:

```bash
curl -sL https://raw.githubusercontent.com/antiwork/gumroad-cli/main/skills/gumroad/SKILL.md -o .claude/skills/gumroad/SKILL.md
```

Then update the commit above.

## What the official skill doesn't say

Checked against the CLI source at the commit above:

- **Files are never removed.** `products update --file` keeps every attached file and adds the new one. The "product updates that remove files" confirmation in `SKILL.md` can't be triggered: `planProductFileRoll` in `internal/cmd/products/file_updates.go` never fills its `Removed` list. Taking a file off the Content tab hides it but leaves it attached (the CLI still lists it). Detaching it needs Gumroad support or a direct API call.
- **Names and descriptions are set at upload only.** Pass `--file-name` and `--file-description` with each `--file`. Nothing edits them on a file that's already attached.
- **PDF stamping isn't in the CLI.** Turn on "Stamp this PDF with buyer information" in the dashboard after every PDF upload.
- **`products content set` changes only the layout.** It decides which files show on the Content tab, not which files are attached.
