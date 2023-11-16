'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderLink {
  title: string;
  href: string;
  external?: boolean;
}

export const HeaderLinks: React.FC<{ links: HeaderLink[] }> = ({ links }) => {
  const pathname = usePathname();
  const urlSplit = pathname.split('/');
  const basePath = `/${urlSplit[1]}`;

  return (
    <div className="absolute left-1/2 my-4 hidden -translate-x-1/2 justify-center lg:flex">
      {links.map((link) => {
        return link.external ? (
          <a
            className="text-text-faint hover:text-text-secondary focus:text-text mx-3 py-0.5 focus-visible:ring"
            href={link.href}
            key={link.href}
            rel="noopener noreferrer"
          >
            {link.title}
          </a>
        ) : (
          <Link
            className={`mx-3 py-0.5 focus-visible:ring ${
              basePath === link.href
                ? 'text-text'
                : 'text-text-faint hover:text-text-secondary focus:text-text'
            }`}
            href={link.href}
            key={link.href}
          >
            {link.title}
          </Link>
        );
      })}
    </div>
  );
};
