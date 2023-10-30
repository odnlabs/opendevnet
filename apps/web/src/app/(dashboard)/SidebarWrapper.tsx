'use client';

import { FiRadio } from 'react-icons/fi';
import { MdOutlineEvent, MdOutlineFavoriteBorder } from 'react-icons/md';
import { PiBooks } from 'react-icons/pi';

import { Sidebar, SidebarButton } from '@components/layout';

export const SidebarWrapper: React.FC = () => {
  const buttons: SidebarButton[][] = [
    [
      {
        label: 'Dashboard',
        href: '/',
        icon: FiRadio,
      },
      {
        label: 'Library',
        href: '/library',
        icon: PiBooks,
      },
      {
        label: 'Events',
        href: '/events',
        icon: MdOutlineEvent,
      },
      {
        label: 'Favorites',
        href: '/favorites',
        icon: MdOutlineFavoriteBorder,
      },
    ],
  ];

  return <Sidebar buttons={buttons} />;
};
