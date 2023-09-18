import React from 'react';

import { HeaderBrand } from './Header/HeaderBrand';
import { HeaderButtons } from './Header/HeaderButtons';
import { HeaderLinks } from './Header/HeaderLinks';

interface HeaderLink {
  title: string;
  href: string;
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
    title: 'Blog',
    href: '/blog',
  },
  {
    title: 'Change Log',
    href: '/changelog',
  },
];

export const Header: React.FC = () => {
  return (
    <>
      <div className="relative h-16 w-full"></div>

      <div className="fixed h-16 w-screen top-0 left-0 bg-[rgb(var(--header))] border-b border-border backdrop-blur-lg">
        <div className="flex justify-between max-w-7xl w-11/12 mx-auto">
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
};
