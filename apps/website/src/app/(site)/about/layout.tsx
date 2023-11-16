'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

const AboutLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const linkRefs = useRef<HTMLAnchorElement[]>([]);

  return (
    <div className="mx-auto mb-20 w-11/12 max-w-7xl">
      <div className="bg-background-secondary relative mx-auto flex w-11/12 max-w-3xl justify-center rounded-b-3xl">
        <div className="relative">
          <span
            className="bg-text absolute bottom-0 left-0 h-0.5 w-24 rounded-lg transition duration-500"
            style={{
              transform: `translateX(${
                links.findIndex((link) => link.href === pathname) * 100
              }%)`,
            }}
          />
        </div>
        {links.map((link, index) => (
          <Link
            className={`group relative w-24 py-4 text-center font-medium transition duration-200 ${
              pathname === link.href
                ? 'text-text'
                : 'text-text-faint hover:text-text-secondary focus:text-text-primary'
            }`}
            href={link.href}
            key={link.href}
            ref={(el) => {
              linkRefs.current[index] = el as HTMLAnchorElement;
            }}
          >
            {link.title}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
};

export default AboutLayout;
