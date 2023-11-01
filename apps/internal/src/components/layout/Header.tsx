import Image from 'next/image';
import Link from 'next/link';

import { IoExitOutline } from '@react-icons/all-files/io5/IoExitOutline';
import { RiGithubFill } from '@react-icons/all-files/ri/RiGithubFill';

import { config } from '@odnlabs/utils';

export const Header: React.FC = () => (
  <>
    <div className="relative h-14 w-full"></div>

    <div className="fixed z-50 top-0 left-0 h-14 w-full bg-[rgb(var(--header))] border-b border-border flex justify-between">
      {/* Branding */}
      <Link
        href="/"
        className="flex font-medium text-2xl px-3 py-3 focus-visible:ring ring-inset"
      >
        <Image
          src="/internal/logo.png"
          alt="Open Dev Net logo"
          height={30}
          width={30}
          className="object-contain mr-2"
        />
        <p>
          <span className="font-semibold text-text-secondary">ODN</span>
          <span className="ml-1.5 bg-clip-text text-transparent bg-gradient-to-r from-brand-gradient-1 to-brand-gradient-2">
            Internal Docs
          </span>
        </p>
      </Link>

      <div className="flex m-2">
        <a
          href={`${config.social.github}/opendevnet/tree/dev/apps/internal/mdx`}
          target="_blank"
          rel="noreferrer"
          className="my-2 -translate-y-px mr-3 text-text-secondary hover:text-text active:text-text"
        >
          <RiGithubFill className="h-6 w-6" />
        </a>
        {/* Main Website */}
        <a
          href={config.site}
          className="flex items-center px-3 py-1.5 text-sm rounded-lg border border-border bg-secondary hover:bg-secondary-hover active:bg-secondary-active transition duration-200 hover:ease-out focus-visible:ring"
        >
          <IoExitOutline className="h-5 w-5" />
          <p className="ml-2">Main Website</p>
        </a>
      </div>
    </div>
  </>
);
