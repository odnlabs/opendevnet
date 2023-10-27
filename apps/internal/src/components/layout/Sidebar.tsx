import { getOrderedSlugs } from '@utils/mdxApi';

import { SidebarGroup } from './SidebarGroup';

export const Sidebar: React.FC = async () => {
  const ordered = await getOrderedSlugs('mdx');

  return (
    <>
      <div className="relative w-60 h-[calc(100vh-3.5rem)]"></div>

      <div className="fixed bottom-0 left-0 w-60 h-[calc(100vh-3.5rem)] bg-[rgb(var(--header))] border-r border-border">
        <div className="pt-2">
          {ordered.map((cat, index) => (
            <div
              key={index}
              className={`py-5 mx-3 ${index !== 0 && 'border-t border-border'}`}
            >
              <p className="font-semibold text-sm text-text mb-2 mx-2.5">
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