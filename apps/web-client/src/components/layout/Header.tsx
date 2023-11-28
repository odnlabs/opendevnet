import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { RiNotification3Line } from '@react-icons/all-files/ri/RiNotification3Line';
import { RiSearchLine } from '@react-icons/all-files/ri/RiSearchLine';

import { config } from '@odnlabs/utils-server';

import { AccountDropdown } from './Header/AccountDropdown';

export const Header: React.FC = () => (
  <header className="border-border fixed left-0 top-0 h-14 w-full border-b bg-[rgb(var(--header))]">
    <div className="flex justify-between">
      {/* Branding */}
      <Link
        className="relative flex px-1.5 py-1 ring-inset focus-visible:ring sm:absolute sm:left-1/2 sm:-translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0"
        href="/"
      >
        <Image
          alt="Logo"
          className="mr-1 h-11 w-11 rounded-full"
          height={100}
          src="/app/logo-trans.png"
          width={100}
        />
        <p className="text-text my-2 text-lg font-medium sm:ml-1 sm:text-xl">
          <span className="hidden sm:inline-block">Open Dev Net</span>
          <span className="sm:hidden">ODN</span>
        </p>
      </Link>
      <div className="flex p-1.5">
        <Image
          alt="Logo"
          className="mr-1 h-11 w-11 rounded-full"
          height={100}
          src="/app/logo.png"
          width={100}
        />
        <p className="text-text-secondary my-2 ml-2 text-xl font-bold">
          Open Dev Net
        </p>
      </div>
      <div className="absolute left-1/2 top-2 w-full max-w-xl -translate-x-1/2">
        <div className="relative w-full">
          <RiSearchLine className="text-text-faint absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <input
            className="bg-background border-border text-text-secondary focus:text-text h-9 w-full rounded-lg border py-2 pl-9 pr-3 transition duration-200 placeholder:text-sm focus:bg-[rgb(var(--input-focus))] focus:ring-2"
            maxLength={100}
            placeholder="Search for networks, events, and users..."
            type="text"
          />
        </div>
      </div>
      <div className="flex">
        <div className="mr-5 py-2">
          <button
            className="text-text-secondary hover:text-text p-1.5"
            type="button"
          >
            <RiNotification3Line className="h-6 w-6" />
          </button>
        </div>
        {/* Account Dropdown */}
        <AccountDropdown defaultAvatar={config.defaultAvatar} />
      </div>
    </div>
  </header>
);
