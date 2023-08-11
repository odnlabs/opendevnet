'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IconType } from 'react-icons';
import { FaCompass } from 'react-icons/fa';
import { HiHome, HiPlus } from 'react-icons/hi';

interface DefaultButton {
  label: string;
  route: string;
  icon: IconType;
}

const NavButton: React.FC<{ btn: DefaultButton }> = ({ btn }) => {
  const pathname = usePathname();

  return (
    <Link
      href={btn.route}
      className={`block w-12 h-12 p-3 mt-2 transition duration-200 rounded-3xl ${
        pathname === btn.route
          ? 'text-text-button bg-primary'
          : 'text-primary bg-background hover:bg-secondary active:bg-secondary-hover'
      }`}
    >
      <btn.icon className="w-6 h-6" />
    </Link>
  );
};

export const NavigationBar: React.FC = () => {
  const defaultButtons: DefaultButton[] = [
    {
      label: 'Create Guild',
      route: '/guilds/create',
      icon: HiPlus,
    },
    {
      label: 'Explore',
      route: '/explore',
      icon: FaCompass,
    },
  ];

  return (
    <>
      <div className="relative w-16 h-full"></div>

      <div className="fixed left-0 w-16 h-full top-10 bg-navigation-bar">
        <div className="px-2">
          <NavButton
            btn={{
              label: 'Home',
              route: '/',
              icon: HiHome,
            }}
          />
        </div>

        <div className="w-10 h-px mx-auto my-3 bg-white/20"></div>

        <div className="px-2">
          {defaultButtons.map((btn) => (
            <NavButton btn={btn} />
          ))}
        </div>
      </div>
    </>
  );
};
