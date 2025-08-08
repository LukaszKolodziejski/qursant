#!/usr/bin/env tsx
import fs from 'node:fs';
import path from 'node:path';

function listExistingPages(appSrcRoot: string): string[] {
  const pages: string[] = ['/'];
  const appDir = path.join(appSrcRoot, 'app');

  function walk(dir: string, relativeBase: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      if (e.name.startsWith('_') || e.name.startsWith('.')) continue;
      const full = path.join(dir, e.name);
      const rel = path.join(relativeBase, e.name);
      if (e.isDirectory()) {
        // only count directories that contain page.tsx
        const pageTsx = path.join(full, 'page.tsx');
        if (fs.existsSync(pageTsx)) {
          const url = '/' + rel.replace(/\\/g, '/');
          pages.push(url);
        }
        walk(full, rel);
      }
    }
  }

  walk(appDir, '');
  // normalize: remove double slashes, keep top-level only
  return Array.from(
    new Set(pages.map((p) => p.replace(/\\/g, '/').replace(/\/+/g, '/')))
  ).sort();
}

function readCsv(csvPath: string): string[] {
  const raw = fs.readFileSync(csvPath, 'utf8');
  return raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

function extractTargetUrlHeaderIndex(header: string[]): number {
  const idx = header.findIndex((h) =>
    ['docelowy_url', 'target_url', 'targeturl'].includes(h.toLowerCase())
  );
  if (idx < 0)
    throw new Error(
      'Brak kolumny docelowy_url/target_url w config/keywords.csv'
    );
  return idx;
}

function run() {
  const repoRoot = process.cwd();
  const csvPath = path.join(repoRoot, 'config', 'keywords.csv');
  const appSrcRoot = path.join(repoRoot, 'apps', 'qursant', 'src');
  const outPath = path.join(repoRoot, 'config', 'keyword-gaps.csv');

  const lines = readCsv(csvPath);
  const header = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
  const urlIdx = extractTargetUrlHeaderIndex(header);

  const pages = new Set(listExistingPages(appSrcRoot));

  const out: string[] = [];
  out.push('keyword,target_url,status,recommendation');

  for (let i = 1; i < lines.length; i += 1) {
    const cols = lines[i]
      .split(',')
      .map((c) => c.trim())
      .map((c) => c.replace(/^"|"$/g, ''));
    const keyword = cols[0] || '';
    const targetUrl = cols[urlIdx] || '';
    if (!targetUrl) continue;
    const normalized =
      targetUrl === '/'
        ? '/'
        : ('/' + targetUrl.replace(/^\/+/, '')).replace(/\/+/g, '/');
    const status = pages.has(normalized) ? 'OK' : 'MISSING';
    const recommendation =
      status === 'OK'
        ? ''
        : `Rozważ utworzenie strony lub sekcji hub dla: ${normalized}`;
    out.push(`"${keyword}","${normalized}",${status},"${recommendation}"`);
  }

  fs.writeFileSync(outPath, out.join('\n'), 'utf8');
  console.log(`Zapisano raport luk: ${outPath}`);
}

run();
