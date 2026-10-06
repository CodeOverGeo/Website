// Runs after `ng build` (see the `build` script in package.json). Copies the
// /ai playbook page and its PDF into the deployed output only when the
// `playbook` flag in feature-flags.json is on. With the flag off nothing is
// copied, so neither file exists on the live site and /ai falls through to
// the SPA like any unknown URL.
//
// Override for a local check without editing the flag:
//   PLAYBOOK=on npm run build
import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'playbook-src';
const OUT = 'dist/personal-portfolio/browser';
const FILES = ['playbook.html', 'ai-without-the-hype-starter-playbook.pdf'];

const flags = JSON.parse(readFileSync('feature-flags.json', 'utf8'));
const override = process.env.PLAYBOOK;
const enabled = override ? override === 'on' : flags.playbook === true;

if (!enabled) {
  console.log('playbook: flag off, /ai not published');
  process.exit(0);
}

const html = readFileSync(join(SRC, 'playbook.html'), 'utf8');
const notes = (html.match(/class="todo"/g) ?? []).length;
const placeholders = (html.match(/\[link\]<\/span>/g) ?? []).length;
if (notes || placeholders) {
  console.error(
    `playbook: flag is on but the page still has ${notes} Editor note(s) and ` +
      `${placeholders} [link] placeholder(s). Resolve them in ` +
      `${SRC}/playbook_final.md and run \`npm run playbook\`, or turn the flag off.`,
  );
  process.exit(1);
}

if (!existsSync(OUT)) {
  console.error(`playbook: ${OUT} not found; run ng build first`);
  process.exit(1);
}

// Both files go to the output root: the page links to the PDF by relative
// filename, and firebase.json serves the page at /ai.
for (const file of FILES) copyFileSync(join(SRC, file), join(OUT, file));
console.log('playbook: flag on, published /ai');
