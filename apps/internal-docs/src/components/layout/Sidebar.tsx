'use client';

import { useState } from 'react';

import { HiOutlineMenu } from '@react-icons/all-files/hi/HiOutlineMenu';
import { MdClose } from '@react-icons/all-files/md/MdClose';

import { OrderedSlugs, webScroll } from '@odnlabs/utils-client';
import Image from 'next/image';
import Link from 'next/link';
import { SidebarGroup } from './SidebarGroup';

interface SidebarProps {
  readonly ordered: OrderedSlugs[];
  readonly website: string;
  readonly github: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ ordered }) => {
  const [openOnMobile, setOpenOnMobile] = useState<boolean>(false);

  return (
    <>
      {/* Burger menu button */}
      <button
        className="hover:bg-secondary text-text active:bg-secondary-hover my-1.5 mr-2 h-11 w-11 rounded-full p-2 focus-visible:ring lg:hidden"
        onClick={() => {
          setOpenOnMobile(true);
          webScroll.disable();
        }}
        type="button"
      >
        <HiOutlineMenu className="h-7 w-7" />
      </button>
      <nav className="fixed">
        {/* Desktop Sidebar */}
        <nav className="border-border hover-thin-scroll no-select fixed bottom-0 left-0 z-40 hidden h-[calc(100vh-3.5rem)] w-72 overflow-y-auto border-r bg-[rgb(var(--header))] pb-20 transition duration-500 lg:block">
          <div className="pt-2">
            {ordered.map((cat, index) => (
              <div
                className={`mx-3 py-5 ${
                  index !== 0 && 'border-border border-t'
                }`}
                key={cat.slug}
              >
                <p className="text-text mx-2.5 mb-2 text-sm font-semibold">
                  {cat.name}
                </p>
                <SidebarGroup
                  cat={cat}
                  close={() => {
                    setOpenOnMobile(false);
                    webScroll.enable();
                  }}
                />
              </div>
            ))}
          </div>
        </nav>
        {/* Mobile Menu */}
        <div
          className={`z-80 bg-background fixed bottom-0 left-0 right-0 top-0 h-screen w-screen overflow-y-auto pb-20 transition-[visibility,transform,opacity] duration-300 lg:hidden ${
            !openOnMobile && 'invisible opacity-0'
          }`}
        >
          <div className="border-border flex h-14 justify-between border-b bg-[rgb(var(--header))]">
            {/* Branding */}
            <Link
              className="m-1 flex rounded-md p-2 text-2xl font-medium ring-inset focus-visible:ring"
              href="/"
              onClick={() => {
                setOpenOnMobile(false);
                webScroll.enable();
              }}
            >
              <Image
                alt="Open Dev Net logo"
                className="mr-2 object-contain"
                height={30}
                src="/internal-docs/logo.png"
                width={30}
              />
              <p>
                <span className="text-text-secondary font-semibold">ODN</span>
                <span className="from-brand-gradient-1 to-brand-gradient-2 ml-1.5 bg-gradient-to-r bg-clip-text text-transparent">
                  Internal Docs
                </span>
              </p>
            </Link>
            {/* Close button */}
            <button
              className="hover:bg-secondary text-text active:bg-secondary-hover my-1.5 mr-2 h-11 w-11 rounded-full p-2 focus-visible:ring lg:hidden"
              onClick={() => {
                setOpenOnMobile(false);
                webScroll.enable();
              }}
              type="button"
            >
              <MdClose className="h-7 w-7" />
            </button>
          </div>
          <div className="pt-2">
            {ordered.map((cat, index) => (
              <div
                className={`mx-3 py-5 ${
                  index !== 0 && 'border-border border-t'
                }`}
                key={cat.slug}
              >
                <p className="text-text mx-2.5 mb-2 text-sm font-semibold">
                  {cat.name}
                </p>
                <SidebarGroup
                  cat={cat}
                  close={() => {
                    setOpenOnMobile(false);
                    webScroll.enable();
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};
