'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderLink {
  title: string;
  href: string;
}

export const HeaderLinks: React.FC<{ links: HeaderLink[] }> = ({ links }) => {
  const pathname = usePathname();

  return (
    <div className="absolute left-1/2 -translate-x-1/2 my-4 flex justify-center">
      {links.map((link) => (
        <Link
          href={link.href}
          className={`${
            pathname === link.href ? 'text-text' : 'text-text-faint'
          } mx-2 py-0.5`}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};
