'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderLink {
  title: string;
  href: string;
}

export const HeaderLinks: React.FC<{ links: HeaderLink[] }> = ({ links }) => {
  const pathname = usePathname();
  const urlSplit = pathname.split('/');
  const basePath = `/${urlSplit[1]}`;

  return (
    <div className="absolute left-1/2 -translate-x-1/2 my-4 hidden lg:flex justify-center">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`${
            basePath === link.href ? 'text-text' : 'text-text-faint'
          } mx-2.5 py-0.5`}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};
