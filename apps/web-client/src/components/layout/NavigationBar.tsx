'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import { BiDotsHorizontalRounded } from '@react-icons/all-files/bi/BiDotsHorizontalRounded';
import { BsPeople } from '@react-icons/all-files/bs/BsPeople';
import { HiOutlinePlus } from '@react-icons/all-files/hi/HiOutlinePlus';
import { IoPlanetOutline } from '@react-icons/all-files/io5/IoPlanetOutline';
import { IconType } from '@react-icons/all-files/lib';
import { RiDashboard2Line } from '@react-icons/all-files/ri/RiDashboard2Line';

import MoreNavLinks from './MoreNavLinks';

interface DefaultButton {
  id?: string;
  label: string;
  isActive?: boolean;
  route?: string;
  onClick?: () => void;
  icon: IconType;
}

const NavButton: React.FC<{
  readonly btn: DefaultButton;
}> = ({ btn }) => {
  const pathname = usePathname();

  return (
    <div className="relative h-14 w-full">
      {btn.route ? (
        <Link
          className={`group mx-1.5 my-0 block h-12 w-12 rounded-lg p-3 transition duration-200 hover:ease-out focus-visible:ring ${
            (btn.route && !btn.isActive && pathname === btn.route) ||
            btn.isActive
              ? 'text-text bg-primary'
              : 'text-text-secondary hover:text-text hover:bg-background-secondary active:text-text active:bg-background-tertiary'
          }`}
          href={btn.route}
          id={btn.id}
        >
          {/* <span
            className={`absolute left-0 top-0 w-0.5 h-full bg-primary shadow-[2px_0_15px_3px_rgba(var(--primary),1)] transition duration-300 ${
              pathname !== btn.route && 'opacity-0 scale-y-0'
            }`}
          ></span> */}
          <btn.icon
            className={`h-6 w-6 ${
              (btn.route && !btn.isActive && pathname === btn.route) ||
              (btn.isActive && 'drop-shadow-[0_0_3px_rgba(var(--text),0.5)]')
            }`}
          />
        </Link>
      ) : (
        <button
          className="text-text-secondary hover:text-text active:text-text hover:bg-background-secondary active:bg-background-tertiary group mx-1.5 my-0.5 block h-12 w-12 rounded-lg p-3 transition duration-200 hover:ease-out focus-visible:ring"
          id={btn.id}
          onClick={() => {
            if (btn.onClick) btn.onClick();
          }}
          type="button"
        >
          <btn.icon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export const NavigationBar: React.FC<{
  readonly website?: string | undefined;
}> = ({ website }) => {
  const [moreLinksOpen, setMoreLinksOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const basePath = pathname.split('/')[1];

  const defaultButtons: DefaultButton[][] = [
    [
      {
        label: 'Dashboard',
        route: '/',
        isActive: ['/', '/library', '/events', '/favorites'].includes(pathname),
        icon: RiDashboard2Line,
      },
      {
        label: 'Friends',
        route: '/friends',
        isActive: basePath === 'friends',
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
        label: 'Create Network',
        route: '/networks/create',
        icon: HiOutlinePlus,
      },
    ],
  ];

  return (
    <>
      <div className="relative h-full w-16" />
      <div className="z-60 border-border/50 fixed left-0 top-14 h-full w-16 border-r bg-[rgb(var(--navigation-bar))]">
        <div className="pt-3">
          {defaultButtons.map((section, index) => (
            <React.Fragment key={section.map((sec) => sec.route).join('-')}>
              {index !== 0 && (
                <div className="bg-background-secondary mx-auto my-2 h-px w-8" />
              )}
              {section.map((btn) => (
                <NavButton btn={btn} key={btn.route} />
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className="absolute bottom-14 left-0 h-14">
          <NavButton
            btn={{
              id: 'more-links-dropdown-btn',
              label: 'Account',
              onClick: () => setMoreLinksOpen(!moreLinksOpen),
              icon: BiDotsHorizontalRounded,
            }}
          />
          <MoreNavLinks
            moreLinksOpen={moreLinksOpen}
            setMoreLinksOpen={setMoreLinksOpen}
            website={website}
          />
        </div>
      </div>
    </>
  );
};
