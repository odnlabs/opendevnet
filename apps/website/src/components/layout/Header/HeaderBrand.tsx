'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

export const HeaderBrand: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Link
      href="/"
      className="relative flex py-2.5 ring-inset focus-visible:ring sm:absolute sm:left-1/2 sm:-translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0"
    >
      <Image
        src={`/logo-trans${theme === 'light' ? 'light' : ''}.png`}
        height={100}
        width={100}
        alt="Logo"
        className="mr-1 h-11 w-11 rounded-full"
      />
      <p className="text-text my-2 text-lg font-medium sm:ml-1 sm:text-xl">
        <span className="hidden sm:inline-block">Open Dev Net</span>
        <span className="sm:hidden">ODN</span>
      </p>
    </Link>
  );
};
