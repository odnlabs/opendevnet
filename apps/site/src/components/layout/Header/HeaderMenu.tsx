'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { MdClose } from 'react-icons/md';
import { RiMenuFill } from 'react-icons/ri';

interface HeaderLink {
  title: string;
  href: string;
}

export const HeaderMenu: React.FC<{ links: HeaderLink[] }> = ({ links }) => {
  const pathname = usePathname();
  const { theme } = useTheme();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className="lg:hidden h-12 w-12 my-2 p-2.5 rounded-3xl transition duration-200 hover:bg-secondary active:bg-secondary-hover"
        onClick={() => setOpen(true)}
      >
        <RiMenuFill className="h-7 w-7" />
      </button>

      <div
        className={`z-60 fixed lg:hidden top-0 left-0 h-screen w-screen bg-black/75 transition-[visibility,opacity] duration-500 ${
          !open && 'invisible opacity-0'
        }`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`z-60 fixed lg:hidden top-0 left-0 h-screen w-full max-w-60 bg-[rgb(var(--navigation-bar))] transition-[transform] duration-500 ${
          !open && '-translate-x-full'
        }`}
      >
        <div className="p-3 flex justify-between border-b border-border h-16">
          <Link href="/" className="flex" onClick={() => setOpen(false)}>
            <Image
              src={`/logo-trans${theme === 'light' ? 'light' : ''}.png`}
              height={100}
              width={100}
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
            <p className="font-medium text-lg text-text my-1.5 ml-1">ODN</p>
          </Link>
          <button className="mr-1" onClick={() => setOpen(false)}>
            <MdClose className="h-6 w-6" />
          </button>
        </div>
        <div className="px-2 py-5">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`block my-1 py-2 px-5 text-sm ${
                pathname === link.href
                  ? 'text-text font-bold'
                  : 'text-text-secondary font-medium'
              }`}
              onClick={() => setOpen(false)}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
