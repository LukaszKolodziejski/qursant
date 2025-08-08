import { notFound } from 'next/navigation';
import { keywords, getAllClusters, getAllIntents } from '@/data/keywords';

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export const dynamic = 'force-dynamic';

export default function SeoKeywordsPage({ searchParams = {} }: PageProps) {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  const clusterFilter = (Array.isArray(searchParams.cluster) ? searchParams.cluster[0] : searchParams.cluster) || '';
  const intentFilter = (Array.isArray(searchParams.intent) ? searchParams.intent[0] : searchParams.intent) || '';
  const sortBy = (Array.isArray(searchParams.sort) ? searchParams.sort[0] : searchParams.sort) || 'volume';

  const availableClusters = getAllClusters();
  const availableIntents = getAllIntents();

  const filtered = keywords.filter((k) => {
    const matchCluster = clusterFilter ? k.cluster === clusterFilter : true;
    const matchIntent = intentFilter ? k.intent === intentFilter : true;
    return matchCluster && matchIntent;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'kd') {
      const aKd = a.kd ?? Number.POSITIVE_INFINITY;
      const bKd = b.kd ?? Number.POSITIVE_INFINITY;
      return aKd - bKd;
    }
    // default: volume desc
    const aVol = a.volume ?? -1;
    const bVol = b.volume ?? -1;
    return bVol - aVol;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Panel SEO — słowa kluczowe</h1>

      <form className="flex flex-wrap gap-3 items-end mb-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm">Klaster</span>
          <select
            name="cluster"
            defaultValue={clusterFilter}
            className="border rounded px-2 py-1"
          >
            <option value="">(wszystkie)</option>
            {availableClusters.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm">Intencja</span>
          <select name="intent" defaultValue={intentFilter} className="border rounded px-2 py-1">
            <option value="">(wszystkie)</option>
            {availableIntents.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm">Sortuj</span>
          <select name="sort" defaultValue={sortBy} className="border rounded px-2 py-1">
            <option value="volume">Wolumen (desc)</option>
            <option value="kd">KD (asc)</option>
          </select>
        </label>
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
          Filtruj
        </button>
      </form>

      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-2">Fraza</th>
              <th className="p-2">Intencja</th>
              <th className="p-2">Klaster</th>
              <th className="p-2">URL</th>
              <th className="p-2">Volume</th>
              <th className="p-2">KD</th>
              <th className="p-2">Priorytet</th>
              <th className="p-2">SERP</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((k) => (
              <tr key={`${k.keyword}-${k.targetUrl}`} className="border-t">
                <td className="p-2 whitespace-nowrap">{k.keyword}</td>
                <td className="p-2 whitespace-nowrap">{k.intent}</td>
                <td className="p-2 whitespace-nowrap">{k.cluster}</td>
                <td className="p-2 whitespace-nowrap">{k.targetUrl}</td>
                <td className="p-2 whitespace-nowrap">{k.volume ?? ''}</td>
                <td className="p-2 whitespace-nowrap">{k.kd ?? ''}</td>
                <td className="p-2 whitespace-nowrap">{k.priority}</td>
                <td className="p-2 whitespace-nowrap">{k.serpTypes ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


