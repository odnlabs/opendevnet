'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Link {
  label: string;
  href: string;
}

const links: { title: string; items: Link[] }[] = [
  {
    title: 'Website',
    items: [
      { label: 'Homepage', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Login', href: '/login' },
      { label: 'Register', href: '/register' },
    ],
  },
  {
    title: 'About Us',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Story', href: '/about' },
      { label: 'Vision', href: '/about/vision' },
      { label: 'Team', href: '/about/team' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Docs', href: '/docs' },
      { label: 'Help Center', href: '/help' },
      { label: 'Feedback', href: '/feedback' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Policies',
    items: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Community Guidelines', href: '/guidelines' },
      { label: 'Licenses', href: '/licenses' },
    ],
  },
];

export const Footer: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="md:py-5 border-t border-border bg-[rgb(var(--footer))] text-sm">
        <div className="max-w-5xl pt-10 md:py-5 lg:py-10 mx-auto md:w-10/12 lg:flex justify-between">
          <div className="mx-auto text-center mb-10 lg:mx-0 lg:text-left w-80 lg:mb-0">
            <Image
              height={50}
              width={50}
              src="/logo.png"
              alt="Footer Logo"
              className="mx-auto lg:mx-0"
            />
            <p className="mt-4 font-medium text-xl text-text-primary">
              Open Dev Net
            </p>
          </div>
          <div className="w-full md:flex justify-between">
            {links.map((category, index) => (
              <div className="md:w-1/4" key={index}>
                <p className="mb-4 font-semibold uppercase text-sm hidden md:block">
                  {category.title}
                </p>
                <button
                  className={`block w-full border-t border-border/50 py-5 font-semibold uppercase text-text-secondary text-sm md:hidden transition duration-200 ${
                    openIndex !== index &&
                    'hover:bg-secondary active:bg-secondary-active'
                  }`}
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  {category.title}
                </button>
                <div
                  className={`transition-[max-height,transform,opacity] duration-300 origin-top ${
                    openIndex === index
                      ? 'max-h-96 md:max-h-full'
                      : 'max-h-0 scale-y-90 opacity-0 overflow-y-hidden md:max-h-full md:scale-y-100 md:overflow-y-auto md:opacity-100'
                  }`}
                >
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <Link
                        href={item.href}
                        className="block md:inline border-t border-border/50 md:border-none bg-secondary/50 hover:bg-secondary focus:bg-secondary-active md:bg-transparent md:hover:bg-transparent md:focus:bg-transparent text-center md:text-left py-4 md:py-0 md:my-2 text-text-secondary md:text-text-faint hover:text-text-primary md:hover:underline active:text-text md:active:underline transition duration-300 md:transition-none ring-inset focus-visible:ring"
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-5 border-t border-border/50 bg-[rgb(var(--footer))] text-sm">
        <p className="text-center text-sm text-text-faint">
          © {new Date().getFullYear()},{' '}
          <Link href="/" className="hover:underline">
            OpenDevNet.com
          </Link>
        </p>
      </div>
    </>
  );
};
