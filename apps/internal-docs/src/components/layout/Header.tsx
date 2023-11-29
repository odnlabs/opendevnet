import Image from 'next/image';
import Link from 'next/link';

import { IoExitOutline } from '@react-icons/all-files/io5/IoExitOutline';
import { RiGithubFill } from '@react-icons/all-files/ri/RiGithubFill';

import { config, mdxApi } from '@odnlabs/utils-server';
import { Sidebar } from './Sidebar';

export const Header: React.FC = async () => {
  const ordered = await mdxApi.getOrderedSlugs('../../docs/internal');

  return (
    <>
      <div className="relative h-14 w-full" />
      <header className="border-border no-select fixed left-0 top-0 z-50 flex h-14 w-full justify-between border-b bg-[rgb(var(--header))]">
        {/* Branding */}
        <Link
          className="m-1 flex rounded-md p-2 text-2xl font-medium ring-inset focus-visible:ring"
          href="/"
        >
          <Image
            alt="Open Dev Net logo"
            className="mr-2 object-contain"
            height={30}
            src="/internal-docs/logo.png"
            width={30}
          />
          <p>
            <span className="text-text-secondary font-semibold">ODN</span>
            <span className="from-brand-gradient-1 to-brand-gradient-2 ml-1.5 bg-gradient-to-r bg-clip-text text-transparent">
              Internal Docs
            </span>
          </p>
        </Link>
        <div className="m-2 hidden lg:flex">
          <a
            className="text-text-secondary hover:text-text active:text-text my-1 mr-2 -translate-y-px rounded-3xl p-1 focus-visible:ring"
            href={`${config.social.github}/opendevnet/tree/dev/docs/internal`}
            rel="noreferrer"
            target="_blank"
          >
            <RiGithubFill className="h-6 w-6" />
          </a>
          {/* Main Website */}
          <a
            className="border-border bg-secondary hover:bg-secondary-hover active:bg-secondary-active flex items-center rounded-lg border px-3 py-1.5 text-sm transition duration-200 hover:ease-out focus-visible:ring"
            href={config.website}
          >
            <IoExitOutline className="h-5 w-5" />
            <p className="ml-2">Main Website</p>
          </a>
        </div>
        {/*
          Sidebar - placed here so burger menu button can be located on the `Sidebar` component.
          This is because the data for the sidebar needs to be fetched on the server, and the menu buttons needs to be on the client side (the header is rendered on the server side). This will no affect the layout as the sidebar is always fixed.
        */}
        <Sidebar
          github={config.social.github}
          ordered={ordered}
          website={config.website}
        />
      </header>
    </>
  );
};
