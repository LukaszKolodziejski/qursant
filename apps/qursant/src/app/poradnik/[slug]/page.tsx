import { notFound } from 'next/navigation';
import { poradnikArticles } from '@/data/poradnik';
import Link from 'next/link';
import FaqSection from '@/components/seo/FaqSection';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return poradnikArticles.map((a) => ({ slug: a.slug }));
}

import { buildCanonicalPath } from '@/lib/canonical';

export function generateMetadata({ params }: Props) {
  const article = poradnikArticles.find((a) => a.slug === params.slug);
  if (!article) return {};
  return {
    title: `${article.title}`,
    description: article.excerpt,
    alternates: { canonical: buildCanonicalPath(`/poradnik/${article.slug}`) },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
    },
  };
}

export default function PoradnikArticlePage({ params }: Props) {
  const article = poradnikArticles.find((a) => a.slug === params.slug);
  if (!article) return notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <header className="mb-6">
        <p className="text-sm text-gray-500">{article.category}</p>
        <h1 className="text-3xl font-bold tracking-tight">{article.title}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {article.excerpt}
        </p>
      </header>

      <section className="prose prose-blue max-w-none dark:prose-invert">
        <p>{article.content}</p>
      </section>

      {/* Linkowanie transakcyjne */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/rezerwacja"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Zarezerwuj kurs
        </Link>
        <Link
          href="/cennik"
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Sprawdź cennik
        </Link>
      </div>

      {/* Powiązane artykuły w klastrze */}
      {poradnikArticles.filter(
        (a) => a.category === article.category && a.slug !== article.slug
      ).length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-3">
            Powiązane w temacie: {article.category}
          </h2>
          <ul className="list-disc ml-5 space-y-1">
            {poradnikArticles
              .filter(
                (a) =>
                  a.category === article.category && a.slug !== article.slug
              )
              .slice(0, 5)
              .map((rel) => (
                <li key={rel.slug}>
                  <Link
                    href={`/poradnik/${rel.slug}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {rel.title}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      )}

      {article.faq && article.faq.length > 0 && (
        <div className="mt-10">
          <FaqSection items={article.faq} heading="FAQ do artykułu" />
        </div>
      )}
    </article>
  );
}
