'use client';

import { BsPeople } from '@react-icons/all-files/bs/BsPeople';
import { FiInbox } from '@react-icons/all-files/fi/FiInbox';

import { Sidebar, SidebarButton } from '@components/layout';

export const SidebarWrapper: React.FC = () => {
  const buttons: SidebarButton[][] = [
    [
      {
        label: 'Friends',
        href: '/friends',
        icon: BsPeople,
      },
      {
        label: 'Requests',
        href: '/friends/requests',
        icon: FiInbox,
      },
    ],
  ];

  return <Sidebar buttons={buttons} />;
};
