'use client';

import { BiBrain } from '@react-icons/all-files/bi/BiBrain';
import { BiData } from '@react-icons/all-files/bi/BiData';
import { BiHomeAlt } from '@react-icons/all-files/bi/BiHomeAlt';
import { BiMobileAlt } from '@react-icons/all-files/bi/BiMobileAlt';
import { HiOutlinePlus } from '@react-icons/all-files/hi/HiOutlinePlus';
import { MdWeb } from '@react-icons/all-files/md/MdWeb';
import { RiSettings3Line } from '@react-icons/all-files/ri/RiSettings3Line';

import { Sidebar, SidebarButton } from '@components/layout/Sidebar';

export const SidebarWrapper: React.FC = () => {
  const buttons: SidebarButton[][] = [
    [
      {
        label: 'Home',
        href: '/networks',
        icon: BiHomeAlt,
      },
      {
        label: 'Data Science',
        href: '/networks/search?q=data-science',
        icon: BiData,
      },
      {
        label: 'Web',
        href: '/networks/search?q=web',
        icon: MdWeb,
      },
      {
        label: 'Mobile App',
        href: '/networks/search?q=mobile',
        icon: BiMobileAlt,
      },
      {
        label: 'Artificial Intelligence',
        href: '/networks/search?q=ai',
        icon: BiBrain,
      },
      {
        label: 'Systems',
        href: '/networks/search?q=systems',
        icon: RiSettings3Line,
      },
    ],
    [
      {
        label: 'Create a Network',
        href: '/networks/create',
        icon: HiOutlinePlus,
      },
    ],
  ];

  return <Sidebar buttons={buttons} />;
};
