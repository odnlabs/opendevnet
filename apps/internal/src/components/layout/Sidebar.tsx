import Link from 'next/link';

import { getSlugs } from '@utils/mdxApi';

export const Sidebar: React.FC = async () => {
  const slugs = await getSlugs('mdx');

  interface Category {
    name: string;
    slug: string;
    items: { title: string; slug: string }[];
  }

  const categories: Category[] = [];

  const preferedOrder = [
    'introduction',
    'contributing',
    'api',
    'web',
    'libraries',
  ];

  for (const doc of slugs) {
    const index = categories.findIndex((cat) => cat.slug === doc.cat);
    if (index !== -1) {
      categories[index].items.push({
        title: doc.title,
        slug: doc.slug,
      });
    } else {
      categories.push({
        name: doc.cat
          .split('-')
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(' '),
        slug: doc.slug,
        items: [
          {
            title: doc.title,
            slug: doc.slug,
          },
        ],
      });
    }
  }

  categories.sort((first, second) => {
    const aIndex = preferedOrder.indexOf(first.slug);
    const bIndex = preferedOrder.indexOf(second.slug);

    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });

  console.log(categories);

  return (
    <>
      <div className="relative w-60 h-[calc(100vh-3.5rem)]"></div>

      <div className="fixed bottom-0 left-0 w-60 h-[calc(100vh-3.5rem)] bg-[rgb(var(--header))] border-r border-border">
        {categories.map((cat, index) => (
          <div key={index} className="mt-5">
            <p className="font-bold text-xs text-text-faint uppercase mb-2 mx-5">
              {cat.name}
            </p>

            {cat.items.map((item, itemIndex) => (
              <Link
                href={`${cat.slug}/${item.slug}`}
                key={itemIndex}
                className="block px-5 py-2 text-sm text-text-primary rounded-lg hover:bg-default active:bg-default-hover"
              >
                {item.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
