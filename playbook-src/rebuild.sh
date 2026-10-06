#!/bin/sh
# Rebuild the /ai handout page and its PDF from playbook_final.md, then copy
# both into public/ so the Angular build ships them at the site root.
# firebase.json rewrites /ai to /playbook.html; the page's relative PDF link
# only resolves because both files sit side by side in public/.
#
# Usage: npm run playbook
set -eu

SRC_DIR=$(cd "$(dirname "$0")" && pwd)
PUBLIC_DIR="$SRC_DIR/../public"
VENV="$SRC_DIR/.venv"
PDF=ai-without-the-hype-starter-playbook.pdf

# build.py uses backslashes inside f-string expressions, which needs Python 3.12+.
if [ ! -x "$VENV/bin/python" ]; then
  echo "Creating $VENV and installing Playwright + Chromium..."
  python3 -c 'import sys; sys.exit(sys.version_info < (3, 12))' \
    || { echo "Python 3.12+ is required" >&2; exit 1; }
  python3 -m venv "$VENV"
  "$VENV/bin/pip" install --quiet playwright
  "$VENV/bin/python" -m playwright install chromium
fi

cd "$SRC_DIR"
"$VENV/bin/python" build.py
"$VENV/bin/python" make_pdf.py

cp playbook.html "$PUBLIC_DIR/playbook.html"
cp "$PDF" "$PUBLIC_DIR/$PDF"
echo "Copied playbook.html and $PDF to public/"

NOTES=$(grep -cE '^\[(CONFIRM|OPTIONAL|REMOVE|HAVE)' playbook_final.md || true)
if [ "$NOTES" -gt 0 ]; then
  echo "WARNING: $NOTES Editor note(s) remain in playbook_final.md. Do not publish until they are resolved:" >&2
  grep -nE '^\[(CONFIRM|OPTIONAL|REMOVE|HAVE)' playbook_final.md | cut -c1-100 >&2
fi
