'use client';
import React from 'react';

type CsvRow = Record<string, string>;

async function fetchData(
  path: string
): Promise<{ headers: string[]; rows: CsvRow[] }> {
  const res = await fetch(path, { cache: 'no-store' });
  if (!res.ok) {
    return { headers: [], rows: [] };
  }
  const json = await res.json();
  return json as { headers: string[]; rows: CsvRow[] };
}

function Table({
  title,
  data,
}: {
  title: string;
  data: { headers: string[]; rows: CsvRow[] };
}) {
  if (!data.headers.length)
    return (
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-500">
          Brak danych (plik nie znaleziony lub pusty).
        </p>
      </section>
    );
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {data.headers.map((h) => (
                <th
                  key={h}
                  className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50">
                {data.headers.map((h) => (
                  <td key={h} className="px-3 py-2 align-top whitespace-nowrap">
                    {row[h]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function SeoAudytPage() {
  const [keywords, setKeywords] = React.useState<{
    headers: string[];
    rows: CsvRow[];
  }>({ headers: [], rows: [] });
  const [competitors, setCompetitors] = React.useState<{
    headers: string[];
    rows: CsvRow[];
  }>({ headers: [], rows: [] });

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      if (typeof window !== 'undefined') {
        window.location.replace('/');
      }
    }
  }, []);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      fetchData('/api/seo/keywords').then(setKeywords);
      fetchData('/api/seo/competitors').then(setCompetitors);
    }
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Audyt SEO — podgląd danych</h1>
      <p className="text-sm text-gray-600 mb-6">
        Wewnętrzna strona developerska. Dane ładowane z plików CSV w katalogu{' '}
        <code>config/</code>.
      </p>
      <Table title="Słowa kluczowe" data={keywords} />
      <Table title="Konkurenci" data={competitors} />
    </div>
  );
}
