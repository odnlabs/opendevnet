import Image from 'next/image';
import React from 'react';

import { HiChevronDown } from 'react-icons/hi';
import { RiNotification3Line } from 'react-icons/ri';

import { config } from '@odnlabs/utils';

export const Header: React.FC = () => (
  <>
    <div className="fixed top-0 left-0 w-full h-14 bg-[rgb(var(--header))]">
      <div className="flex justify-between">
        {/* Branding */}
        <div className="flex p-1.5">
          <Image
            src="/logo.png"
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
          <input
            type="text"
            placeholder="Search for networks, events, and users..."
            className="py-2 px-3 h-10 rounded-lg bg-[rgb(var(--input))] border border-border w-full focus:bg-[rgb(var(--input-focus))] transition duration-200 placeholder:text-sm text-text-secondary"
          />
        </div>

        <div className="flex">
          <div className="mr-5 py-2">
            <button className="text-text-secondary hover:text-text p-1.5">
              <RiNotification3Line className="h-6 w-6" />
            </button>
          </div>

          {/* Account Dropdown */}
          <div className="py-1.5 mr-3">
            <button className="flex text-text-secondary">
              <Image
                src={config.defaultAvatar}
                alt="User Avatar"
                className="h-10 w-10 rounded-full"
              />
              <span className="ml-2.5 mr-1.5 py-2 font-medium">User</span>
              <HiChevronDown className="h-5 w-5 my-2.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
);
