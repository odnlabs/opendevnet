'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { HiChevronRight } from 'react-icons/hi';

import { mdxApi } from '@odnlabs/utils';

const SidebarLink: React.FC<{
  cat: mdxApi.OrderedSlugs;
  item: mdxApi.Item;
  subItem?: mdxApi.Item;
}> = ({ cat, item, subItem }) => {
  const pathname = usePathname();

  const itemPath = `/${cat.slug}/${item.slug}${
    subItem ? `/${subItem.slug}` : ''
  }`;

  return (
    <Link
      href={itemPath}
      className={`block px-2.5 py-1.5 my-1 text-sm rounded-md ${
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

export const SidebarGroup: React.FC<{ cat: mdxApi.OrderedSlugs }> = ({
  cat,
}) => {
  const [open, setOpen] = useState<number[]>([]);

  const pathname = usePathname();

  return cat.items.map((item, itemIndex) =>
    item.items && item.items?.length > 0 ? (
      <div className="h-full overflow-hidden" key={itemIndex}>
        <button
          className={`flex w-full justify-between text-left px-2.5 py-1.5 text-sm rounded-md ${
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
            className={`h-5 w-5 mt-px transition duration-300 ${
              open.includes(itemIndex) && 'rotate-90'
            }`}
          />
        </button>
        <div
          className={`grid transition-all duration-300 ${
            open.includes(itemIndex)
              ? 'grid-rows-[1fr] mt-1'
              : 'grid-rows-[0fr]'
          }`}
        >
          <div className={`overflow-hidden mx-2 px-2 border-l border-border`}>
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
