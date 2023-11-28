'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

export const HeaderBrand: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Link
      className="relative my-1 flex rounded-md py-1.5 pl-2 pr-4 ring-inset focus-visible:ring sm:absolute sm:left-1/2 sm:-translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0"
      href="/"
    >
      <Image
        alt="Logo"
        className="mr-1 h-11 w-11 rounded-full"
        height={100}
        src={`/logo-trans${theme === 'light' ? 'light' : ''}.png`}
        width={100}
      />
      <p className="text-text my-2 text-lg font-medium sm:ml-1 sm:text-xl">
        <span className="hidden sm:inline-block">Open Dev Net</span>
        <span className="sm:hidden">ODN</span>
      </p>
    </Link>
  );
};
