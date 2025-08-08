import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

async function resolveConfigFile(fileName: string): Promise<string | null> {
  const candidates = [
    path.resolve(process.cwd(), 'config', fileName),
    path.resolve(process.cwd(), '..', 'config', fileName),
    path.resolve(process.cwd(), '..', '..', 'config', fileName),
    path.resolve(process.cwd(), '..', '..', '..', 'config', fileName),
  ];
  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      continue;
    }
  }
  return null;
}

function parseCsv(content: string): {
  headers: string[];
  rows: Record<string, string>[];
} {
  const lines = content.trim().split(/\r?\n/);
  if (lines.length === 0) return { headers: [], rows: [] };
  const headers = lines[0].split(',').map((h) => h.trim());
  const rows = lines.slice(1).map((line) => {
    const values = line
      .replace(/^"|"$/g, '')
      .split(',')
      .map((v) => v.replace(/^"|"$/g, '').trim());
    const row: Record<string, string> = {};
    headers.forEach((h, i) => (row[h] = values[i] ?? ''));
    return row;
  });
  return { headers, rows };
}

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const filePath = await resolveConfigFile('competitors.csv');
  if (!filePath) {
    return NextResponse.json({ headers: [], rows: [] });
  }
  const content = await fs.readFile(filePath, 'utf8');
  const data = parseCsv(content);
  return NextResponse.json(data);
}
