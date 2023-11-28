import React from 'react';

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
    title: 'Help',
    href: '/help',
  },
  {
    title: 'Sitemap',
    href: '/sitemap',
  },
];

export const Header: React.FC = () => (
  <>
    <div className="relative h-16 w-full" />
    <header className="border-border no-select fixed left-0 top-0 z-40 h-16 w-screen border-b bg-[rgb(var(--header))] backdrop-blur-lg">
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
    </header>
  </>
);
