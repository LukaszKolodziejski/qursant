// Eksport prostej mapy treści do CSV (bez kompilacji TS)
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function loadTopics() {
  const dataDir = path.resolve(__dirname, '../../src/data/poradnik');
  if (!(await fileExists(dataDir))) {
    return [];
  }
  const files = await fs.readdir(dataDir);
  const entries = [];
  for (const f of files) {
    if (!f.endsWith('.ts') && !f.endsWith('.mdx')) continue;
    const slug = f.replace(/\.(ts|mdx)$/i, '');
    const full = path.join(dataDir, f);
    const content = await fs.readFile(full, 'utf8');
    const titleMatch =
      content.match(/title:\s*["'`](.*?)["'`]/) ||
      content.match(/export\s+const\s+title\s*=\s*["'`](.*?)["'`]/);
    const title = titleMatch ? titleMatch[1] ?? slug : slug;
    entries.push({
      slug,
      title,
      category: '',
      intent: '',
      targetUrl: `/poradnik/${slug}`,
    });
  }
  return entries;
}

async function main() {
  const workspaceRoot = path.resolve(__dirname, '../../../..');
  const outDir = path.join(workspaceRoot, 'dist');
  await fs.mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, 'topical-map.csv');

  const topics = await loadTopics();
  const lines = [];
  lines.push(['slug', 'title', 'category', 'intent', 'target_url'].join(','));
  for (const t of topics) {
    const row = [t.slug, t.title, t.category, t.intent, t.targetUrl]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(',');
    lines.push(row);
  }
  await fs.writeFile(outFile, lines.join('\n'), 'utf8');
  console.log(`Zapisano: ${outFile} (${topics.length} wierszy)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
