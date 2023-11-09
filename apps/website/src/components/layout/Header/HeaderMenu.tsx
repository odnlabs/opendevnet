'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { MdClose } from '@react-icons/all-files/md/MdClose';
import { RiMenuFill } from '@react-icons/all-files/ri/RiMenuFill';

interface HeaderLink {
  title: string;
  href: string;
  external?: boolean;
}

export const HeaderMenu: React.FC<{ links: HeaderLink[] }> = ({ links }) => {
  const pathname = usePathname();
  const { theme } = useTheme();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className="hover:bg-secondary active:bg-secondary-hover my-2 h-12 w-12 rounded-3xl p-2.5 transition duration-200 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <RiMenuFill className="h-7 w-7" />
      </button>

      <div
        className={`z-60 fixed left-0 top-0 h-screen w-screen bg-black/75 transition-[visibility,opacity] duration-500 lg:hidden ${
          !open && 'invisible opacity-0'
        }`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`z-60 max-w-60 fixed left-0 top-0 h-screen w-full bg-[rgb(var(--navigation-bar))] transition-[transform] duration-500 lg:hidden ${
          !open && '-translate-x-full'
        }`}
      >
        <div className="border-border flex h-16 justify-between border-b p-3">
          <Link href="/" className="flex" onClick={() => setOpen(false)}>
            <Image
              src={`/logo-trans${theme === 'light' ? 'light' : ''}.png`}
              height={100}
              width={100}
              alt="Logo"
              className="h-10 w-10 rounded-full"
            />
            <p className="text-text my-1.5 ml-1 text-lg font-medium">ODN</p>
          </Link>
          <button className="mr-1" onClick={() => setOpen(false)}>
            <MdClose className="h-6 w-6" />
          </button>
        </div>
        <div className="px-2 py-5">
          {links.map((link, index) =>
            link.external ? (
              <a
                key={index}
                href={link.href}
                rel="noopener noreferrer"
                className="text-text-secondary my-1 block px-5 py-2 text-sm font-medium"
              >
                {link.title}
              </a>
            ) : (
              <Link
                key={index}
                href={link.href}
                className={`my-1 block px-5 py-2 text-sm ${
                  pathname === link.href
                    ? 'text-text font-bold'
                    : 'text-text-secondary font-medium'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.title}
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
};
