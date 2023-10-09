'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

export const HeaderBrand: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Link
      href="/"
      className="relative sm:absolute sm:left-1/2 sm:-translate-x-1/2 lg:left-0 lg:translate-x-0 lg:relative flex py-2.5"
    >
      <Image
        src={`/logo-trans${theme === 'light' ? 'light' : ''}.png`}
        height={100}
        width={100}
        alt="Logo"
        className="w-11 h-11 mr-1 rounded-full"
      />
      <p className="font-medium text-lg sm:text-xl text-text my-2 sm:ml-1">
        <span className="hidden sm:inline-block">Open Dev Net</span>
        <span className="sm:hidden">ODN</span>
      </p>
    </Link>
  );
};
