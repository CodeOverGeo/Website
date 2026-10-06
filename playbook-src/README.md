# Starter Playbook: handoff kit

## How this works
- `playbook_final.md` is the source of truth for all wording. Edit text here, never in the HTML.
- `python3 build.py` turns it into `playbook.html` (self-contained: CSS, JS, and the Atkinson Hyperlegible font are embedded).
- `python3 make_pdf.py` turns `playbook.html` into `ai-without-the-hype-starter-playbook.pdf` using the page's print styles.
- Rebuild both after every text change so the page and PDF always match.

## Markdown conventions build.py relies on
- `## Heading` starts a section. Sections become the table of contents.
- Under "The four guardrails", `### 1. Title` becomes a numbered amber guardrail.
- Under "The ladder", `### Rung N: Name` becomes a rung. Rungs 2, 4, 6, 7 are tagged "New in this playbook" (set in build.py).
- Other `###` headings become business profile cards.
- `> text` becomes a prompt box with a Copy button. `[placeholders]` inside prompts are highlighted.
- The fenced code block is the business context template with a Copy button.
- A paragraph starting with `[CONFIRM...]`, `[OPTIONAL...]`, `[REMOVE...]`, or `[HAVE...]` becomes a dashed "Editor note" box.
- `[text](https://url)` becomes a link (and prints the URL in the PDF).

## Publishing rules
- Do not publish while any Editor note boxes remain. Resolve each one, then delete the bracketed line from the markdown.
- The page links to the PDF by relative filename, so both files go in the same folder.
- Serve over HTTPS. The Copy buttons use the clipboard API, which browsers only allow on secure pages (there is a fallback, but HTTPS is the reliable path).
- Short URL for the slide and QR code (for example /ai) should point to this page.

## Writing rules for any new text
Plain language for non-technical readers. No em dashes. Avoid reflexive groups of three and filler phrases. Capitalize the first letter after a colon.
