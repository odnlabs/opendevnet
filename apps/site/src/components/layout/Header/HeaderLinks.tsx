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
      {links.map((link, index) =>
        link.external ? (
          <a
            key={index}
            href={link.href}
            rel="noopener noreferrer"
            className="text-text-faint hover:text-text-secondary focus:text-text mx-3 py-0.5 focus-visible:ring"
          >
            {link.title}
          </a>
        ) : (
          <Link
            key={index}
            href={link.href}
            className={`mx-3 py-0.5 focus-visible:ring ${
              basePath === link.href
                ? 'text-text'
                : 'text-text-faint hover:text-text-secondary focus:text-text'
            }`}
          >
            {link.title}
          </Link>
        )
      )}
    </div>
  );
};
