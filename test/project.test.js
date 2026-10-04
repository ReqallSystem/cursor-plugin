import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { detectProject } from '../dist/index.js';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

test('tests and packaging build the shipped runtime with its policy', () => {
  const repo = fileURLToPath(new URL('../', import.meta.url));
  const pkg = JSON.parse(readFileSync(join(repo, 'package.json'), 'utf8'));
  assert.equal(pkg.scripts.prepack, 'npm run build');
  assert.match(pkg.scripts.test, /^npm run build && /);
  const packed = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], { cwd: repo, encoding: 'utf8' }))[0];
  const files = new Set(packed.files.map(file => file.path));
  for (const file of ['dist/index.js', 'dist/index.d.ts', 'dist/project-policy.js', 'dist/project-policy.d.ts']) {
    assert.ok(files.has(file), `missing runtime asset ${file}`);
  }
});

test('public Cursor detector reads portable identity rather than old core basename', () => {
  const root = mkdtempSync(join(tmpdir(), 'reqall-cursor-project-'));
  const previous = process.env.REQALL_PROJECT_NAME;
  delete process.env.REQALL_PROJECT_NAME;
  try {
    writeFileSync(join(root, '.reqall-workspace'), '');
    writeFileSync(join(root, '.reqall.yml'), 'project: acme/cursor-notes\n');
    assert.equal(detectProject(root), 'acme/cursor-notes');
  } finally {
    if (previous === undefined) delete process.env.REQALL_PROJECT_NAME;
    else process.env.REQALL_PROJECT_NAME = previous;
    rmSync(root, { recursive: true, force: true });
  }
});
