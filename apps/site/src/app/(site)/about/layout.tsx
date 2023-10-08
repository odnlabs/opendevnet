'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  interface Link {
    title: string;
    href: string;
  }

  const links: Link[] = [
    {
      title: 'Story',
      href: '/about',
    },
    {
      title: 'Vision',
      href: '/about/vision',
    },
    {
      title: 'Team',
      href: '/about/team',
    },
  ];

  return (
    <div className="max-w-7xl w-11/12 mx-auto mb-20">
      <div className="relative flex justify-center bg-background-secondary max-w-3xl w-11/12 mx-auto rounded-b-3xl">
        <div className="relative">
          <span
            style={{
              transform: `translateX(${
                links.findIndex((link) => link.href === pathname) * 100
              }%)`,
            }}
            className={`absolute left-0 bottom-0 h-0.5 rounded-lg w-24 bg-text transition duration-500`}
          ></span>
        </div>

        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`group relative py-4 w-24 text-center font-medium transition duration-200 ${
              pathname === link.href
                ? 'text-text'
                : 'text-text-faint hover:text-text-secondary focus:text-text-primary'
            }`}
          >
            {link.title}
          </Link>
        ))}
      </div>

      {children}
    </div>
  );
}
