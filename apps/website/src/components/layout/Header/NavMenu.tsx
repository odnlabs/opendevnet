'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { MdClose } from '@react-icons/all-files/md/MdClose';
import { RiMenuFill } from '@react-icons/all-files/ri/RiMenuFill';

interface NavLink {
  title: string;
  href: string;
  external?: boolean;
}

export const NavMenu: React.FC<{ links: NavLink[] }> = ({ links }) => {
  const pathname = usePathname();
  const { theme } = useTheme();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    window.onkeydown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
  }, []);

  return (
    <>
      {/* Burger menu button */}
      <button
        className="hover:bg-secondary active:bg-secondary-hover my-2 h-12 w-12 rounded-3xl p-2.5 transition duration-200 focus-visible:ring lg:hidden"
        onClick={() => setOpen(true)}
        type="button"
      >
        <RiMenuFill className="h-7 w-7" />
      </button>
      {/* Menu overlay */}
      <div
        className={`z-60 fixed left-0 top-0 h-screen w-screen bg-black/75 transition-[visibility,opacity] duration-500 lg:hidden ${
          !open && 'invisible opacity-0'
        }`}
        onClick={() => setOpen(false)}
      />
      {/* Menu */}
      <div
        className={`z-60 max-w-60 fixed left-0 top-0 h-screen w-full bg-[rgb(var(--navigation-bar))] transition-[transform] duration-500 lg:hidden ${
          !open && '-translate-x-full'
        }`}
      >
        {open && (
          <>
            <div className="border-border flex h-16 justify-between border-b p-3">
              <Link
                className="flex focus-visible:ring"
                href="/"
                onClick={() => setOpen(false)}
              >
                <Image
                  alt="Logo"
                  className="h-10 w-10 rounded-full"
                  height={100}
                  src={`/logo-trans${theme === 'light' ? 'light' : ''}.png`}
                  width={100}
                />
                <p className="text-text my-1.5 ml-1 text-lg font-medium">ODN</p>
              </Link>
              <button
                className="mr-1 focus-visible:ring"
                onClick={() => setOpen(false)}
                type="button"
              >
                <MdClose className="h-6 w-6" />
              </button>
            </div>
            <div className="px-2 py-5">
              {links.map((link) => {
                return link.external ? (
                  <a
                    className="text-text-secondary my-1 block px-5 py-2 text-sm font-medium focus-visible:ring"
                    href={link.href}
                    key={link.href}
                    rel="noopener noreferrer"
                  >
                    {link.title}
                  </a>
                ) : (
                  <Link
                    className={`my-1 block px-5 py-2 text-sm focus-visible:ring ${
                      pathname === link.href
                        ? 'text-text font-bold'
                        : 'text-text-secondary font-medium'
                    }`}
                    href={link.href}
                    key={link.href}
                    onClick={() => setOpen(false)}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};
