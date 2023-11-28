'use client';

import { BiBookBookmark } from '@react-icons/all-files/bi/BiBookBookmark';
import { FiRadio } from '@react-icons/all-files/fi/FiRadio';
import { MdEvent } from '@react-icons/all-files/md/MdEvent';
import { MdFavoriteBorder } from '@react-icons/all-files/md/MdFavoriteBorder';

import { Sidebar, SidebarButton } from '@components/layout/Sidebar';

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
        icon: BiBookBookmark,
      },
      {
        label: 'Events',
        href: '/events',
        icon: MdEvent,
      },
      {
        label: 'Favorites',
        href: '/favorites',
        icon: MdFavoriteBorder,
      },
    ],
  ];

  return <Sidebar buttons={buttons} />;
};
