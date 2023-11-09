import Image from 'next/image';
import Link from 'next/link';

import { IoExitOutline } from '@react-icons/all-files/io5/IoExitOutline';
import { RiGithubFill } from '@react-icons/all-files/ri/RiGithubFill';

import { config } from '@odnlabs/utils-server';

export const Header: React.FC = () => (
  <>
    <div className="relative h-14 w-full"></div>

    <div className="border-border fixed left-0 top-0 z-50 flex h-14 w-full justify-between border-b bg-[rgb(var(--header))]">
      {/* Branding */}
      <Link
        href="/"
        className="flex px-3 py-3 text-2xl font-medium ring-inset focus-visible:ring"
      >
        <Image
          src="/internal-docs/logo.png"
          alt="Open Dev Net logo"
          height={30}
          width={30}
          className="mr-2 object-contain"
        />
        <p>
          <span className="text-text-secondary font-semibold">ODN</span>
          <span className="from-brand-gradient-1 to-brand-gradient-2 ml-1.5 bg-gradient-to-r bg-clip-text text-transparent">
            Internal Docs
          </span>
        </p>
      </Link>

      <div className="m-2 flex">
        <a
          href={`${config.social.github}/opendevnet/tree/dev/apps/internal-docs/mdx`}
          target="_blank"
          rel="noreferrer"
          className="text-text-secondary hover:text-text active:text-text my-2 mr-3 -translate-y-px"
        >
          <RiGithubFill className="h-6 w-6" />
        </a>
        {/* Main Website */}
        <a
          href={config.website}
          className="border-border bg-secondary hover:bg-secondary-hover active:bg-secondary-active flex items-center rounded-lg border px-3 py-1.5 text-sm transition duration-200 hover:ease-out focus-visible:ring"
        >
          <IoExitOutline className="h-5 w-5" />
          <p className="ml-2">Main Website</p>
        </a>
      </div>
    </div>
  </>
);
