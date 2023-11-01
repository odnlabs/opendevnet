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
      <div className="relative w-60 h-full"></div>

      <div className="fixed w-60 z-50 h-full left-16 top-14 bg-[rgb(var(--sidebar))] border-r border-border/50">
        <div className="px-3 pt-3">
          {buttons.map((section, index) => (
            <div key={index}>
              {section.map((btn, btnIndex) => (
                <Link
                  key={btnIndex}
                  href={btn.href}
                  className={`flex w-full px-3 py-3 my-0.5 text-sm rounded-md border-l-2 transition duration-200 hover:ease-out ${
                    pathname === btn.href
                      ? 'text-text bg-primary-glass/20 border-primary-glass'
                      : 'text-text-secondary hover:bg-secondary active:bg-secondary-hover hover:text-text active:text-text border-transparent'
                  }`}
                >
                  <btn.icon className="w-5 h-5 mr-3 mt-0" />
                  <span className="tracking-wide">{btn.label}</span>
                </Link>
              ))}
              <div className="w-full h-px mx-auto my-3 bg-text/10"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
