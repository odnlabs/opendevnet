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
  btn: DefaultButton;
}> = ({ btn }) => {
  const pathname = usePathname();

  return (
    <div className="w-full h-14 relative">
      {btn.route ? (
        <Link
          id={btn.id}
          href={btn.route}
          className={`group block w-12 h-12 p-3 my-0 mx-1.5 rounded-lg transition duration-200 hover:ease-out focus-visible:ring ${
            (btn.route && !btn.isActive && pathname === btn.route) ||
            btn.isActive
              ? 'text-text bg-primary'
              : 'text-text-secondary hover:text-text hover:bg-background-secondary active:text-text active:bg-background-tertiary'
          }`}
        >
          {/* <span
            className={`absolute left-0 top-0 w-0.5 h-full bg-primary shadow-[2px_0_15px_3px_rgba(var(--primary),1)] transition duration-300 ${
              pathname !== btn.route && 'opacity-0 scale-y-0'
            }`}
          ></span> */}
          <btn.icon
            className={`w-6 h-6 ${
              (btn.route && !btn.isActive && pathname === btn.route) ||
              (btn.isActive && 'drop-shadow-[0_0_3px_rgba(var(--text),0.5)]')
            }`}
          />
        </Link>
      ) : (
        <button
          id={btn.id}
          className="group block w-12 h-12 p-3 my-0.5 mx-1.5 rounded-lg transition duration-200 hover:ease-out text-text-secondary hover:text-text active:text-text hover:bg-background-secondary active:bg-background-tertiary focus-visible:ring"
          onClick={btn.onClick}
        >
          <btn.icon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export const NavigationBar: React.FC<{ site?: string | undefined }> = ({
  site,
}) => {
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
      <div className="relative w-16 h-full"></div>

      <div className="fixed z-60 left-0 w-16 h-full top-14 bg-[rgb(var(--navigation-bar))] border-r border-border/50">
        <div className="pt-3">
          {defaultButtons.map((section, index) => (
            <React.Fragment key={index}>
              {index !== 0 && (
                <div className="w-8 h-px mx-auto my-2 bg-background-secondary"></div>
              )}
              {section.map((btn, index) => (
                <NavButton btn={btn} key={index} />
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
            site={site}
          />
        </div>
      </div>
    </>
  );
};
