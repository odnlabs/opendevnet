import Image from 'next/image';
import React from 'react';

import { RiNotification3Line } from '@react-icons/all-files/ri/RiNotification3Line';
import { RiSearchLine } from '@react-icons/all-files/ri/RiSearchLine';

import Link from 'next/link';
import { AccountDropdown } from './Header/AccountDropdown';

export const Header: React.FC = () => (
  <>
    <div className="fixed top-0 left-0 w-full h-14 bg-[rgb(var(--header))] border-b border-border">
      <div className="flex justify-between">
        {/* Branding */}
        <Link
          href="/"
          className="relative sm:absolute sm:left-1/2 sm:-translate-x-1/2 lg:left-0 lg:translate-x-0 lg:relative flex py-1 px-1.5 ring-inset focus-visible:ring"
        >
          <Image
            src={`/app/logo-trans.png`}
            height={100}
            width={100}
            alt="Logo"
            className="w-11 h-11 mr-1 rounded-full"
          />
          <p className="font-medium text-lg sm:text-xl text-text my-2 sm:ml-1">
            <span className="hidden sm:inline-block">Open Dev Net</span>
            <span className="sm:hidden">ODN</span>
          </p>
        </Link>

        <div className="flex p-1.5">
          <Image
            src="/app/logo.png"
            height={100}
            width={100}
            alt="Logo"
            className="w-11 h-11 mr-1 rounded-full"
          />
          <p className="font-bold text-xl text-text-secondary my-2 ml-2">
            Open Dev Net
          </p>
        </div>

        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-full max-w-xl">
          <div className="relative w-full">
            <RiSearchLine className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" />
            <input
              type="text"
              placeholder="Search for networks, events, and users..."
              className="py-2 pl-9 pr-3 h-9 rounded-lg bg-background border border-border w-full focus:bg-[rgb(var(--input-focus))] transition duration-200 placeholder:text-sm text-text-secondary focus:text-text focus:ring-2 ring-primary"
              maxLength={100}
            />
          </div>
        </div>

        <div className="flex">
          <div className="mr-5 py-2">
            <button className="text-text-secondary hover:text-text p-1.5">
              <RiNotification3Line className="h-6 w-6" />
            </button>
          </div>

          {/* Account Dropdown */}
          <AccountDropdown />
        </div>
      </div>
    </div>
  </>
);
