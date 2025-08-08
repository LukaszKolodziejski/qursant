import {
  keywordEntries,
  availableRoutes,
  keywords as keywordRecords,
} from '@/data/keywords';

export type KeywordEntry = (typeof keywordEntries)[number];

type PathToKeywordsCache = Map<string, KeywordEntry[]>;
type ClusterToKeywordsCache = Map<string, KeywordEntry[]>;

const pathToKeywordsCache: PathToKeywordsCache = new Map();
const clusterToKeywordsCache: ClusterToKeywordsCache = new Map();

const existingRoutes = new Set(availableRoutes);

export function getKeywordsForPath(pathname: string): KeywordEntry[] {
  const normalized = normalizePath(pathname);
  if (pathToKeywordsCache.has(normalized)) {
    const cached = pathToKeywordsCache.get(normalized);
    return cached ?? [];
  }
  const result = keywordEntries.filter(
    (k) => normalizePath(k.target_url) === normalized
  );
  pathToKeywordsCache.set(normalized, result);
  return result;
}

export function getClusterKeywords(cluster: string): KeywordEntry[] {
  const key = cluster.toLowerCase();
  if (clusterToKeywordsCache.has(key)) {
    const cached = clusterToKeywordsCache.get(key);
    return cached ?? [];
  }
  const result = keywordEntries.filter((k) => k.cluster.toLowerCase() === key);
  clusterToKeywordsCache.set(key, result);
  return result;
}

export function normalizePath(pathname: string): string {
  if (!pathname) return '/';
  let p = pathname.trim();
  if (!p.startsWith('/')) p = '/' + p;
  if (p !== '/' && p.endsWith('/')) p = p.replace(/\/+$/, '');
  return p;
}

export function filterExistingRoutes(paths: string[]): string[] {
  return paths.filter((p) => existingRoutes.has(normalizePath(p)));
}

export function suggestRelatedTargets(currentPath: string, max = 6): string[] {
  const normalized = normalizePath(currentPath);
  // 1) Find cluster(s) for current path
  const currentKeywords = getKeywordsForPath(normalized);
  const clusters = Array.from(new Set(currentKeywords.map((k) => k.cluster)));

  // 2) Collect targets from same clusters, excluding current
  const scores = new Map<string, number>();
  const priorityWeight: Record<string, number> = Object.create(null);
  for (const rec of keywordRecords) {
    const url = normalizePath(rec.targetUrl);
    const weight =
      rec.priority === 'HIGH' ? 3 : rec.priority === 'MEDIUM' ? 2 : 1;
    if (!priorityWeight[url] || weight > priorityWeight[url]) {
      priorityWeight[url] = weight;
    }
  }
  for (const c of clusters) {
    const entries = getClusterKeywords(c);
    for (const e of entries) {
      const target = normalizePath(e.target_url);
      if (target === normalized) continue;
      const base = 1;
      const weight = priorityWeight[target] ?? 1;
      // higher priority should contribute more to the score
      scores.set(target, (scores.get(target) ?? 0) + base * weight);
    }
  }

  // 3) Sort by score desc, then alpha
  const sorted = Array.from(scores.entries())
    .filter(([target]) => existingRoutes.has(target))
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0]);
    })
    .map(([target]) => target);

  // 4) Fallback: if no cluster-based links, suggest a small curated list of core hubs
  const fallback: string[] = filterExistingRoutes([
    '/kursy',
    '/cennik',
    '/pytania',
    '/o-nas',
    '/rezerwacja',
    '/galeria',
  ]).filter((p) => p !== normalized);

  const combined = sorted.length > 0 ? sorted : fallback;
  return combined.slice(0, Math.max(3, Math.min(max, 6)));
}
