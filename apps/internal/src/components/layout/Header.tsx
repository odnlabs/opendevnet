import Image from 'next/image';
import Link from 'next/link';

export const Header: React.FC = () => (
  <>
    <div className="relative h-14 w-full"></div>

    <div className="fixed z-50 top-0 left-0 h-14 w-screen bg-[rgb(var(--header))] border-b border-border flex">
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
    </div>
  </>
);
