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
      className={`block w-10 h-10 p-2 mt-4 transition duration-200 rounded-xl ${
        pathname === btn.route
          ? 'text-text-button bg-primary ring-2 ring-secondary ring-offset-4 ring-offset-navigation-bar'
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
        <div className="px-3 py-1">
          <NavButton
            btn={{
              label: 'Home',
              route: '/',
              icon: HiHome,
            }}
          />
        </div>

        <div className="w-8 h-px mx-auto my-4 bg-text-button/20"></div>

        <div className="px-3">
          {defaultButtons.map((btn) => (
            <NavButton btn={btn} />
          ))}
        </div>
      </div>
    </>
  );
};
