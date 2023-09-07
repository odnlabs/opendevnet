'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { IconType } from 'react-icons';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
import { HiOutlinePlus } from 'react-icons/hi';
import { IoPlanetOutline } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import MoreNavLinks from './MoreNavLinks';

interface DefaultButton {
  label: string;
  route?: string;
  onClick?: () => void;
  icon: IconType;
}

const NavButton: React.FC<{
  btn: DefaultButton;
}> = ({ btn }) => {
  const pathname = usePathname();

  return btn.route ? (
    <Link
      href={btn.route}
      className={`relative block w-full h-14 px-4 py-4 mx-0 mt-1 ${
        pathname === btn.route
          ? 'text-text bg-secondary/50'
          : 'text-text/50 hover:text-text hover:bg-secondary/20 active:text-text active:bg-secondary/30 focus:bg-secondary/30'
      }`}
    >
      <span
        className={`absolute left-0 top-0 w-0.5 h-full bg-primary shadow-[2px_0_15px_3px_rgba(var(--primary),1)] transition duration-300 ${
          pathname !== btn.route && 'opacity-0 scale-y-0'
        }`}
      ></span>
      <btn.icon
        className={`w-6 h-6 ${
          pathname === btn.route && 'drop-shadow-[0_0_3px_rgba(var(--text),1)]'
        }`}
      />
    </Link>
  ) : (
    <button
      className="relative block w-full h-14 px-4 py-4 mx-0 mt-1 transition-[background] duration-300 text-text/50 hover:text-text active:text-text"
      onClick={btn.onClick}
    >
      <btn.icon className="w-6 h-6" />
    </button>
  );
};

export const NavigationBar: React.FC = () => {
  const defaultButtons: DefaultButton[][] = [
    [
      {
        label: 'Dashboard',
        route: '/',
        icon: RxDashboard,
      },
      {
        label: 'Friends',
        route: '/friends',
        icon: BsPeople,
      },
      {
        label: 'Network',
        route: '/networks',
        icon: IoPlanetOutline,
      },
    ],
    [
      {
        label: 'Create Guild',
        route: '/guilds/create',
        icon: HiOutlinePlus,
      },
    ],
  ];

  return (
    <>
      <div className="relative w-14 h-full"></div>

      <div className="fixed z-60 left-0 w-14 h-full top-14 bg-navigation-bar">
        <div className="">
          {defaultButtons.map((section, index) => (
            <React.Fragment key={index}>
              {index !== 0 && (
                <div className="w-8 h-px mx-auto my-2 bg-text/20"></div>
              )}
              {section.map((btn, i) => (
                <NavButton btn={btn} key={i} />
              ))}
            </React.Fragment>
          ))}
        </div>

        <div className="absolute bottom-14 left-0 h-14">
          <NavButton
            btn={{
              label: 'Account',
              onClick: () => console.log('Account'),
              icon: BiDotsHorizontalRounded,
            }}
          />
          <MoreNavLinks />
        </div>
      </div>
    </>
  );
};
