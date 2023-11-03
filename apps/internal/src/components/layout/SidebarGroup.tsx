'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Item, OrderedSlugs } from '@odnlabs/utils-client';
import { HiChevronRight } from '@react-icons/all-files/hi/HiChevronRight';

const SidebarLink: React.FC<{
  cat: OrderedSlugs;
  item: Item;
  subItem?: Item;
}> = ({ cat, item, subItem }) => {
  const pathname = usePathname();

  const itemPath = `/${cat.slug}/${item.slug}${
    subItem ? `/${subItem.slug}` : ''
  }`;

  return (
    <Link
      href={itemPath}
      className={`my-1 block rounded-md px-2.5 py-1.5 text-sm ${
        itemPath === pathname ||
        (pathname === '/' && itemPath === '/introduction/introduction')
          ? 'bg-primary font-medium'
          : 'text-text-secondary hover:bg-secondary active:bg-secondary-hover hover:text-text active:text-text'
      }`}
    >
      {subItem ? subItem.name : item.name}
    </Link>
  );
};

export const SidebarGroup: React.FC<{ cat: OrderedSlugs }> = ({ cat }) => {
  const [open, setOpen] = useState<number[]>([]);

  const pathname = usePathname();

  return cat.items.map((item, itemIndex) =>
    item.items && item.items?.length > 0 ? (
      <div className="h-full overflow-hidden" key={itemIndex}>
        <button
          className={`flex w-full justify-between rounded-md px-2.5 py-1.5 text-left text-sm ${
            pathname.startsWith(`/${cat.slug}/${item.slug}`)
              ? 'bg-secondary font-medium'
              : 'text-text-secondary hover:bg-secondary active:bg-secondary-hover hover:text-text active:text-text'
          }`}
          onClick={() =>
            setOpen((prev) =>
              prev.includes(itemIndex)
                ? prev.filter((idx) => idx !== itemIndex)
                : [...prev, itemIndex]
            )
          }
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
          <div className={`border-border mx-2 overflow-hidden border-l px-2`}>
            {item.items.map((subItem, subItemIndex) => (
              <SidebarLink
                cat={cat}
                item={item}
                subItem={subItem}
                key={subItemIndex}
              />
            ))}
          </div>
        </div>
      </div>
    ) : (
      <SidebarLink cat={cat} item={item} key={itemIndex} />
    )
  );
};
