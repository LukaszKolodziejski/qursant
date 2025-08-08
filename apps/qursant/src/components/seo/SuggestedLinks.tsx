import Link from 'next/link';
import { suggestRelatedTargets } from '@/lib/keywords';

type SuggestedLinksProps = {
  currentPath: string;
  maxLinks?: number;
  className?: string;
  heading?: string;
};

export default function SuggestedLinks({
  currentPath,
  maxLinks = 6,
  className,
  heading = 'Powiązane strony',
}: SuggestedLinksProps) {
  const links = suggestRelatedTargets(currentPath, maxLinks);
  if (links.length === 0) return null;

  return (
    <div className={className}>
      <div className="container mx-auto px-6">
        <h2 className="text-xl font-semibold text-white mb-4">{heading}</h2>
        <div className="flex flex-wrap gap-3">
          {links.map((href) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition"
            >
              {href === '/' ? 'Strona główna' : labelFromPath(href)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function labelFromPath(p: string): string {
  const name = p.split('/').filter(Boolean).pop() ?? '';
  if (!name) return 'Strona główna';
  return name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
