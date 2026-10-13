---
name: gumroad-site-check
description: >
  Check that the website's Gumroad references match the live product: the buy
  link, the price in the Terms, and the Gumroad wording in the Terms and
  Privacy pages. Trigger on "check the Gumroad link", "does the site match
  Gumroad", "price changed on Gumroad", or before releasing changes to those
  pages. Read only. Uses the official `gumroad` skill for CLI details.
---

# Checking the site against Gumroad

Use the official `gumroad` skill (`.claude/skills/gumroad/`) for how the CLI works, and read its `README.md` for the CLI's known limits. This skill only reads from Gumroad. It never changes the product.

## Where the site mentions Gumroad

| File | What it says |
|---|---|
| `playbook-src/playbook_final.md` | The "Get the full playbook" link: https://georufino.gumroad.com/l/playbook |
| `src/app/pages/terms/terms.component.html` | Section 4.1: The price (29 USD) and Gumroad as merchant of record |
| `src/app/pages/privacy/privacy.component.html` | What Gumroad collects and shares, and a link to Gumroad's privacy policy |

Find any new mentions with `grep -rIn -i gumroad playbook-src src`.

## Check

```bash
gumroad auth status
gumroad products list --json --no-input --jq '.products[] | {id, name, published, formatted_price, short_url}'
```

Then confirm:

- [ ] The product's `short_url` matches every buy link on the site.
- [ ] `published` is `true`. If it's not, every buy link leads to a dead page.
- [ ] `formatted_price` matches the price in Terms section 4.1.
- [ ] The product name matches how the Terms and Privacy pages name the ebook.

Report any mismatch to Geo with the file and line. Change the site to match Gumroad only when Geo asks. Never change the Gumroad product from this repo.

## Rules

- Read-only commands only: `auth status`, `products list`, `products view`, `products url`.
- Never put the paid edition's files, text or release steps in this repo.
