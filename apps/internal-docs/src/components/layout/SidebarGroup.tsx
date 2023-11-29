'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Item, OrderedSlugs } from '@odnlabs/utils-client';
import { HiChevronRight } from '@react-icons/all-files/hi/HiChevronRight';

interface SidebarLinkProps {
  cat: OrderedSlugs;
  item: Item;
  subItem?: Item;
  disabled: boolean;
  close: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  cat,
  item,
  subItem,
  disabled,
  close,
}) => {
  const pathname = usePathname();

  const itemPath = `/${cat.slug}/${item.slug}${
    subItem ? `/${subItem.slug}` : ''
  }`;

  const className = `my-1 block rounded-md px-3 py-2.5 lg:px-2.5 lg:py-1.5 text-sm focus-visible:ring ${
    itemPath === pathname ||
    (pathname === '/' && itemPath === '/introduction/introduction')
      ? 'bg-primary font-medium'
      : 'text-text-secondary hover:bg-secondary active:bg-secondary-hover hover:text-text active:text-text'
  }`;

  return disabled ? (
    <p className={className}>{subItem ? subItem.name : item.name}</p>
  ) : (
    <Link className={className} href={itemPath} onClick={close}>
      {subItem ? subItem.name : item.name}
    </Link>
  );
};

interface SidebarGroupProps {
  cat: OrderedSlugs;
  close: () => void;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ cat, close }) => {
  const [open, setOpen] = useState<number[]>([]);

  const pathname = usePathname();

  return cat.items.map((item, itemIndex) => {
    return item.items && item.items?.length > 0 ? (
      <div className="h-full" key={item.slug}>
        <button
          className={`flex w-full justify-between rounded-md px-3 py-2.5 text-left text-sm focus-visible:ring lg:px-2.5 lg:py-1.5 ${
            pathname.startsWith(`/${cat.slug}/${item.slug}`)
              ? 'bg-secondary cursor-default font-medium'
              : 'text-text-secondary hover:bg-secondary active:bg-secondary-hover hover:text-text active:text-text'
          }`}
          onClick={() => {
            setOpen((prev) => {
              return prev.includes(itemIndex)
                ? prev.filter((idx) => idx !== itemIndex)
                : [...prev, itemIndex];
            });
          }}
          type="button"
        >
          {item.name}
          <HiChevronRight
            className={`mt-px h-5 w-5 transition duration-300 ${
              (pathname.startsWith(`/${cat.slug}/${item.slug}`) ||
                open.includes(itemIndex)) &&
              'rotate-90'
            }`}
          />
        </button>
        <div
          className={`grid transition-all duration-300 ${
            pathname.startsWith(`/${cat.slug}/${item.slug}`) ||
            open.includes(itemIndex)
              ? 'mt-1 grid-rows-[1fr]'
              : 'grid-rows-[0fr]'
          }`}
        >
          <div className="border-border mx-2 overflow-hidden border-l px-2">
            {item.items.map((subItem) => (
              <SidebarLink
                cat={cat}
                close={close}
                disabled={
                  !(
                    pathname.startsWith(`/${cat.slug}/${item.slug}`) ||
                    open.includes(itemIndex)
                  )
                }
                item={item}
                key={subItem.slug}
                subItem={subItem}
              />
            ))}
          </div>
        </div>
      </div>
    ) : (
      <SidebarLink
        cat={cat}
        close={close}
        disabled={false}
        item={item}
        key={item.slug}
      />
    );
  });
};
