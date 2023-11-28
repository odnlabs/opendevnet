'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { MdEmail } from '@react-icons/all-files/md/MdEmail';
import { RiGithubFill } from '@react-icons/all-files/ri/RiGithubFill';
import { RiLinkedinFill } from '@react-icons/all-files/ri/RiLinkedinFill';
import { SiYoutube } from '@react-icons/all-files/si/SiYoutube';

import { Button } from '@components';

interface Link {
  label: string;
  href: string;
}

interface FooterProps {
  socialUrls: {
    github: string;
    linkedin: string;
    youtube: string;
    email: string;
  };
  internalDocs?: string | undefined;
}

export const Footer: React.FC<FooterProps> = ({ socialUrls, internalDocs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const socialMediaLinks = [
    {
      name: 'GitHub',
      url: socialUrls.github,
      icon: RiGithubFill,
    },
    {
      name: 'LinkedIn',
      url: socialUrls.linkedin,
      icon: RiLinkedinFill,
    },
    {
      name: 'YouTube',
      url: socialUrls.youtube,
      icon: SiYoutube,
    },
    {
      name: 'Email',
      url: socialUrls.email,
      icon: MdEmail,
    },
  ];

  const links: { title: string; items: Link[] }[] = [
    {
      title: 'Website',
      items: [
        { label: 'Homepage', href: '/' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Blog', href: '/blog' },
        { label: 'Login', href: '/login' },
        { label: 'Register', href: '/register' },
      ],
    },
    {
      title: 'About Us',
      items: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Story', href: '/about' },
        { label: 'The Vision Ahead', href: '/about/vision' },
        { label: 'Meet the Team', href: '/about/team' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { label: 'Internal Docs', href: internalDocs ?? '/404' },
        { label: 'Help Center', href: '/help' },
        { label: 'Feedback', href: '/feedback' },
        { label: 'Changelog', href: '/changelog' },
        { label: 'Sitemap', href: '/sitemap' },
      ],
    },
    {
      title: 'Policies',
      items: [
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Community Guidelines', href: '/guidelines' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Licenses', href: '/licenses' },
      ],
    },
  ];

  return (
    <div id="footer">
      <div className="mx-auto mb-8 w-11/12 max-w-7xl rounded-lg bg-gradient-to-tr from-rose-600 to-blue-700 shadow-xl sm:mb-10 lg:mb-20">
        <div className="justify-between p-10 md:flex md:p-12 lg:p-20">
          <div className="drop-shadow-lg">
            <h1 className="text-2xl font-semibold lg:text-3xl">
              Try Open Dev Net today!
            </h1>
            <p className="mt-3">
              Supercharge your development journey with Open Dev Net.
            </p>
          </div>
          <div className="min-w-72 flex pt-5 md:justify-end md:py-5">
            <div>
              <Link
                className="group inline-block rounded-sm shadow-sm"
                href="/register"
              >
                <Button
                  label="Register"
                  link
                  size="lg"
                  variant="secondary-glass"
                />
              </Link>
            </div>
            <div className="w-3" />
            <div>
              <Link
                className="group inline-block rounded-sm shadow-sm"
                href="/login"
              >
                <Button
                  label="Log In"
                  link
                  size="lg"
                  variant="secondary-glass"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <footer className="border-border border-t bg-[rgb(var(--footer))] text-sm md:py-10">
        <div className="mx-auto max-w-7xl justify-between pt-10 md:w-10/12 md:py-5 lg:flex lg:py-10">
          <div className="mx-auto mb-10 w-80 text-center lg:mx-0 lg:mb-0 lg:text-left">
            <Image
              alt="Footer Logo"
              className="mx-auto lg:mx-0"
              height={50}
              src="/logo.png"
              width={50}
            />
            <p className="text-text-primary mt-4 text-xl font-medium">
              Open Dev Net
            </p>
            <div className="text-text-faint -ml-1 mt-3 flex justify-center lg:justify-start">
              {socialMediaLinks.map((link) => (
                <a
                  className="hover:text-text-secondary active:text-text focus-visible:text-text mr-1 rounded-md p-1 focus-visible:ring"
                  href={link.url}
                  key={link.url}
                  rel="noreferrer"
                  target="_black"
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="w-full max-w-4xl justify-between md:flex">
            {links.map((category, index) => (
              <div
                className="md:w-1/4"
                key={category.title.replaceAll(' ', '-').toLowerCase()}
              >
                {/* Category */}
                <p className="mb-2 hidden px-2 text-sm font-semibold uppercase md:block">
                  {category.title}
                </p>
                <button
                  className={`border-border/50 text-text-secondary block w-full border-t py-5 text-sm font-semibold uppercase transition duration-200 md:hidden ${
                    openIndex !== index &&
                    'hover:bg-secondary active:bg-secondary-active'
                  }`}
                  onClick={() => {
                    setOpenIndex(openIndex === index ? null : index);
                  }}
                  type="button"
                >
                  {category.title}
                </button>
                {/* Links */}
                <div
                  className={`origin-top transition-[max-height,transform,opacity] duration-300 ${
                    openIndex === index
                      ? 'max-h-96 md:max-h-full'
                      : 'max-h-0 scale-y-90 overflow-y-hidden opacity-0 md:max-h-full md:scale-y-100 md:overflow-y-auto md:opacity-100'
                  }`}
                >
                  {category.items.map((item) => (
                    <div key={item.href}>
                      <Link
                        className="border-border/50 bg-secondary/50 hover:bg-secondary focus:bg-secondary-active text-text-secondary md:text-text-faint hover:text-text-primary active:text-text focus-visible:text-text block border-t py-4 text-center ring-inset transition duration-300 focus-visible:ring md:inline-block md:rounded-md md:border-none md:bg-transparent md:px-2 md:py-1 md:text-left md:transition-none md:hover:bg-transparent md:focus:bg-transparent"
                        href={item.href}
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
      </footer>
      <div className="border-border/50 border-t bg-[rgb(var(--footer))] py-8 text-sm">
        <p className="text-text-faint text-center text-sm">
          &copy; {new Date().getFullYear()},{' '}
          <Link
            className="hover:text-text focus-visible:text-text rounded-md p-1 focus-visible:ring"
            href="/"
          >
            OpenDevNet.com
          </Link>
        </p>
      </div>
    </div>
  );
};
