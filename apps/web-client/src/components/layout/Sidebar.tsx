'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IconType } from '@react-icons/all-files/lib';

export interface SidebarButton {
  label: string;
  href: string;
  icon: IconType;
}

interface SidebarProps {
  buttons: SidebarButton[][];
}

export const Sidebar: React.FC<SidebarProps> = ({ buttons }) => {
  const pathname = usePathname();

  return (
    <>
      <div className="relative h-full w-60" />
      <div className="border-border/50 fixed left-16 top-14 z-50 h-full w-60 border-r bg-[rgb(var(--sidebar))]">
        <div className="px-3 pt-3">
          {buttons.map((section) => (
            <div key={section.map((sec) => sec.href).join('-')}>
              {section.map((btn) => (
                <Link
                  className={`my-0.5 flex w-full rounded-md border-l-2 px-3 py-3 text-sm transition duration-200 hover:ease-out ${
                    pathname === btn.href
                      ? 'text-text bg-primary-glass/20 border-primary-glass'
                      : 'text-text-secondary hover:bg-secondary active:bg-secondary-hover hover:text-text active:text-text border-transparent'
                  }`}
                  href={btn.href}
                  key={btn.href}
                >
                  <btn.icon className="mr-3 mt-0 h-5 w-5" />
                  <span className="tracking-wide">{btn.label}</span>
                </Link>
              ))}
              <div className="bg-text/10 mx-auto my-3 h-px w-full" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
