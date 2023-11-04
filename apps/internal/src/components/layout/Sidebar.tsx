import { mdxApi } from '@odnlabs/utils-server';

import { SidebarGroup } from './SidebarGroup';

export const Sidebar: React.FC = async () => {
  const ordered = await mdxApi.getOrderedSlugs('mdx');

  return (
    <>
      <div className="relative h-[calc(100vh-3.5rem)] w-72"></div>

      <div className="border-border hover-thin-scroll fixed bottom-0 left-0 z-40 h-[calc(100vh-3.5rem)] w-72 overflow-y-auto border-r bg-[rgb(var(--header))] pb-20">
        <div className="pt-2">
          {ordered.map((cat, index) => (
            <div
              key={index}
              className={`mx-3 py-5 ${index !== 0 && 'border-border border-t'}`}
            >
              <p className="text-text mx-2.5 mb-2 text-sm font-semibold">
                {cat.name}
              </p>

              <SidebarGroup cat={cat} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
