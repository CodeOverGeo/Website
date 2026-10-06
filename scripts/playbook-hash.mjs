// Fingerprint of everything the playbook page and PDF are generated from.
// `npm run playbook` records it in playbook-src/playbook.source-hash after a
// rebuild; publish-playbook.mjs recomputes it during `npm run build` and fails
// if they differ, so an edit committed without a rebuild is caught in CI
// (which cannot run the Python build itself).
//
// The inputs are hashed rather than the outputs because the PDF differs
// byte-for-byte on every rebuild.
//
// Usage: node scripts/playbook-hash.mjs --write
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const SRC_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'playbook-src');
export const STAMP = join(SRC_DIR, 'playbook.source-hash');

function inputs() {
  const fonts = readdirSync(join(SRC_DIR, 'fonts'))
    .filter((f) => f.endsWith('.ttf'))
    .sort()
    .map((f) => `fonts/${f}`);
  return ['playbook_final.md', 'style.css', 'build.py', ...fonts];
}

export function sourceHash() {
  const hash = createHash('sha256');
  for (const file of inputs()) {
    hash.update(`${file}\0`);
    hash.update(readFileSync(join(SRC_DIR, file)));
    hash.update('\0');
  }
  return hash.digest('hex');
}

export function recordedHash() {
  try {
    return readFileSync(STAMP, 'utf8').trim();
  } catch {
    return null;
  }
}

if (process.argv[2] === '--write') {
  writeFileSync(STAMP, `${sourceHash()}\n`);
  console.log(`playbook: recorded source hash in ${STAMP}`);
}
