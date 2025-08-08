import Link from 'next/link';
import { poradnikArticles, poradnikCategories } from '@/data/poradnik';
import { buildCanonicalPath } from '@/lib/canonical';

export const metadata = {
  title: 'Poradnik kierowcy — egzaminy, kursy, formalności',
  description:
    'Hub poradnikowy Qursant: egzaminy, kursy i tryby, cennik i finansowanie, jazdy doszkalające, formalności. Praktyczne artykuły i wskazówki.',
  alternates: { canonical: buildCanonicalPath('/poradnik') },
};

type SearchParams = { sort?: string; page?: string };

export default function PoradnikHubPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sort = searchParams.sort || 'najnowsze';
  const pageParam = searchParams.page;

  const sortFn = (
    a: (typeof poradnikArticles)[number],
    b: (typeof poradnikArticles)[number]
  ) => {
    if (sort === 'alfabetycznie') return a.title.localeCompare(b.title, 'pl');
    // domyślnie „najnowsze” — bez dat, więc fallback alfabetycznie malejąco tytułem
    return b.title.localeCompare(a.title, 'pl');
  };

  const allSorted = [...poradnikArticles].sort(sortFn);
  const shouldPaginate = allSorted.length > 20;
  const pageSize = 20;
  const totalPages = Math.max(1, Math.ceil(allSorted.length / pageSize));
  const currentPage = pageParam
    ? Math.max(1, Math.min(Number.parseInt(pageParam, 10) || 1, totalPages))
    : 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginated = allSorted.slice(startIndex, startIndex + pageSize);

  const articlesByCategory = poradnikCategories.map((cat) => ({
    category: cat,
    items: [...poradnikArticles.filter((a) => a.category === cat)].sort(sortFn),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Poradnik
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-3xl">
          Zbiór praktycznych artykułów o kursach prawa jazdy, egzaminach,
          kosztach i formalnościach. Wybierz kategorię i przejdź do treści.
        </p>
      </header>

      <div className="flex items-center justify-between mb-6">
        <div />
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600 dark:text-gray-300">Sortuj:</span>
          <Link
            href="/poradnik?sort=najnowsze"
            className={`px-3 py-1 rounded-md ${
              sort === 'najnowsze'
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Najnowsze
          </Link>
          <Link
            href="/poradnik?sort=alfabetycznie"
            className={`px-3 py-1 rounded-md ${
              sort === 'alfabetycznie'
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Alfabetycznie
          </Link>
        </div>
      </div>

      {shouldPaginate ? (
        <>
          <ul className="space-y-4">
            {paginated.map((a) => (
              <li key={a.slug} className="">
                <Link
                  href={`/poradnik/${a.slug}`}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {a.title}
                </Link>
                <p className="text-sm text-gray-500">{a.excerpt}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center justify-between">
            <div>
              {currentPage > 1 ? (
                <Link
                  href={
                    currentPage - 1 === 1
                      ? `/poradnik?sort=${sort}`
                      : `/poradnik?sort=${sort}&page=${currentPage - 1}`
                  }
                  rel="prev"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  ← Poprzednia
                </Link>
              ) : (
                <span className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 text-gray-400 cursor-not-allowed">
                  ← Poprzednia
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Strona {currentPage} z {totalPages}
            </p>
            <div>
              {currentPage < totalPages ? (
                <Link
                  href={`/poradnik?sort=${sort}&page=${currentPage + 1}`}
                  rel="next"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Następna →
                </Link>
              ) : (
                <span className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 text-gray-400 cursor-not-allowed">
                  Następna →
                </span>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articlesByCategory.map(({ category, items }) => (
            <section key={category} className="">
              <h2 className="text-xl font-semibold mb-3">{category}</h2>
              <ul className="space-y-2">
                {items.map((a) => (
                  <li key={a.slug} className="">
                    <Link
                      href={`/poradnik/${a.slug}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {a.title}
                    </Link>
                    <p className="text-sm text-gray-500">{a.excerpt}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
