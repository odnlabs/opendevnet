import React from 'react';

import { config } from '@odnlabs/utils';

import { HeaderBrand } from './Header/HeaderBrand';
import { HeaderButtons } from './Header/HeaderButtons';
import { HeaderLinks } from './Header/HeaderLinks';
import { HeaderMenu } from './Header/HeaderMenu';

interface HeaderLink {
  title: string;
  href: string;
  external?: boolean;
}

const links: HeaderLink[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Internal',
    href: `${config.internal}`,
    external: true,
  },
  {
    title: 'Help',
    href: '/help',
  },
  {
    title: 'Changelog',
    href: '/changelog',
  },
  {
    title: 'Sitemap',
    href: '/sitemap',
  },
];

export const Header: React.FC = () => (
  <>
    <div className="relative h-16 w-full"></div>

    <div className="border-border fixed left-0 top-0 z-40 h-16 w-screen border-b bg-[rgb(var(--header))] backdrop-blur-lg">
      <div className="mx-auto flex w-11/12 max-w-7xl justify-between">
        {/* Menu */}
        <HeaderMenu links={links} />

        {/* Branding */}
        <HeaderBrand />

        {/* Links */}
        <HeaderLinks links={links} />

        {/* App/Authentication */}
        <HeaderButtons />
      </div>
    </div>
  </>
);
