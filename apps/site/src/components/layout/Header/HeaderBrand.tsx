'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

export const HeaderBrand: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Link href="/" className="flex py-2.5">
      <Image
        src={`/logo-trans${theme === 'light' ? 'light' : ''}.png`}
        height={100}
        width={100}
        alt="Logo"
        className="w-11 h-11 mr-1 rounded-full"
      />
      <p className="font-medium text-xl text-text my-2 ml-1">Open Dev Net</p>
    </Link>
  );
};
