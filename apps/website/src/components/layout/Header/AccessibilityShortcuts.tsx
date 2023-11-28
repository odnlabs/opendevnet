'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const AccessibilityShortcuts: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    document.body.focus();
  }, [pathname]);

  return (
    <div className="z-100 fixed left-4 top-4">
      <button
        className="bg-secondary hover:bg-secondary-hover active:bg-secondary-active absolute left-0 top-0 -translate-x-[calc(100%+16px)] whitespace-nowrap rounded-md px-10 py-4 text-sm focus-visible:translate-x-0 focus-visible:ring"
        id="skip-to-content"
        onClick={() => {
          document.getElementById('main')?.focus();
        }}
        type="button"
      >
        Skip to main content
      </button>
      <Link
        className="bg-secondary hover:bg-secondary-hover active:bg-secondary-active absolute left-0 top-0 -translate-x-[calc(100%+16px)] whitespace-nowrap rounded-md px-10 py-4 text-sm focus-visible:translate-x-0 focus-visible:ring"
        href="/accessibility"
        onClick={(event) => {
          event.currentTarget.blur();
          document.getElementById('skip-to-content')?.focus();
        }}
      >
        Accessibility Help
      </Link>
      <Link
        className="bg-secondary hover:bg-secondary-hover active:bg-secondary-active absolute left-0 top-0 -translate-x-[calc(100%+16px)] whitespace-nowrap rounded-md px-10 py-4 text-sm focus-visible:translate-x-0 focus-visible:ring"
        href="/feedback?category=accessibility"
        onClick={() => {
          document.body.focus();
        }}
      >
        Accessibility Feedback
      </Link>
    </div>
  );
};
