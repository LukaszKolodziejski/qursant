/*
  Prosty walidator duplikatów meta.
  Odczytuje tytuł i opis z:
   - /apps/qursant/src/app/layout.tsx (home – default title/description)
   - layout.tsx w segmentach: /kursy, /cennik, /rezerwacja, /pytania, /o-nas, /galeria, /kontakt
  Zapisuje raport CSV do config/meta-duplicates.csv
*/

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

type MetaRecord = { path: string; title: string; description: string };

const repoRoot = join(__dirname, '../../../..');
const appRoot = join(repoRoot, 'apps/qursant/src/app');

function extractRootMeta(fileContent: string): MetaRecord {
  const titleDefaultMatch = fileContent.match(
    /title:\s*\{[\s\S]*?default:\s*'([^']+)'[\s\S]*?\}/
  );
  const descMatch = fileContent.match(/description:\s*'([^']+)'/);
  return {
    path: '/',
    title: titleDefaultMatch?.[1] ?? '',
    description: descMatch?.[1] ?? '',
  };
}

function extractBuildMeta(fileContent: string, path: string): MetaRecord {
  // Szukamy buildMeta({ ... title: '...', description: '...' })
  const blockMatch = fileContent.match(/buildMeta\(\{[\s\S]*?\}\)/);
  const block = blockMatch?.[0] ?? '';
  const titleMatch = block.match(/title:\s*'([^']+)'/);
  const descMatch = block.match(/description:\s*'([^']+)'/);
  return {
    path,
    title: titleMatch?.[1] ?? '',
    description: descMatch?.[1] ?? '',
  };
}

function read(filePath: string): string {
  return readFileSync(filePath, 'utf-8');
}

function main() {
  const routes: Array<{ path: string; file: string; isRoot?: boolean }> = [
    { path: '/', file: join(appRoot, 'layout.tsx'), isRoot: true },
    { path: '/kursy', file: join(appRoot, 'kursy/layout.tsx') },
    { path: '/cennik', file: join(appRoot, 'cennik/layout.tsx') },
    { path: '/rezerwacja', file: join(appRoot, 'rezerwacja/layout.tsx') },
    { path: '/pytania', file: join(appRoot, 'pytania/layout.tsx') },
    { path: '/o-nas', file: join(appRoot, 'o-nas/layout.tsx') },
    { path: '/galeria', file: join(appRoot, 'galeria/layout.tsx') },
    { path: '/kontakt', file: join(appRoot, 'kontakt/layout.tsx') },
  ];

  const meta: MetaRecord[] = [];
  for (const r of routes) {
    try {
      const content = read(r.file);
      if (r.isRoot) {
        meta.push(extractRootMeta(content));
      } else {
        meta.push(extractBuildMeta(content, r.path));
      }
    } catch {
      meta.push({ path: r.path, title: '', description: '' });
    }
  }

  // Analiza duplikatów
  const titleMap = new Map<string, string[]>();
  const descMap = new Map<string, string[]>();
  for (const m of meta) {
    if (m.title) {
      titleMap.set(m.title, [...(titleMap.get(m.title) ?? []), m.path]);
    }
    if (m.description) {
      descMap.set(m.description, [
        ...(descMap.get(m.description) ?? []),
        m.path,
      ]);
    }
  }

  const lines = [
    'path,title,description,duplicate_title,duplicate_description',
    ...meta.map((m) => {
      const dupTitle = (titleMap.get(m.title) ?? []).filter(
        (p) => p !== m.path
      );
      const dupDesc = (descMap.get(m.description) ?? []).filter(
        (p) => p !== m.path
      );
      return [
        m.path,
        '"' + (m.title ?? '').replace(/"/g, '""') + '"',
        '"' + (m.description ?? '').replace(/"/g, '""') + '"',
        '"' + dupTitle.join('|') + '"',
        '"' + dupDesc.join('|') + '"',
      ].join(',');
    }),
  ];

  const outDir = join(repoRoot, 'config');
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, 'meta-duplicates.csv');
  writeFileSync(outPath, lines.join('\n'), 'utf-8');
  console.log(`Wygenerowano raport: ${outPath}`);
}

main();
