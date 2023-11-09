import { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@components';
import { Item, SubItem } from '@odnlabs/utils-client';
import { mdxApi } from '@odnlabs/utils-server';

interface Params {
  category: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<Metadata> => {
  const ordered = await mdxApi.getOrderedSlugs('mdx/help');
  const category = ordered.find((cat) => cat.slug === params.category);
  if (!category)
    return {
      title: 'Not Found',
    };

  return {
    title: `Help Center - ${category.name} | Open Dev Net`,
  };
};

const Section: React.FC<{
  name: string;
  description: string;
  slug: string;
  items: (SubItem | Item)[] | undefined;
}> = ({ name, slug, description, items }) =>
  items && (
    <div className="bg-background-secondary border-border mt-8 rounded-lg border p-8">
      <Link href={`/help/${slug}`}>
        <h2 className="text-2xl font-semibold hover:underline">{name}</h2>
      </Link>
      <p className="text-text-secondary mt-3">{description}</p>
      <div className="border-border mt-5 border-t pt-2">
        {items.map((item, index) => (
          <div key={index} className="my-2">
            <Link href={`/help/${slug}/${item.slug}`} className="link">
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

const HelpCategory = async ({
  params,
}: {
  params: Params;
}): Promise<JSX.Element> => {
  const ordered = await mdxApi.getOrderedSlugs('mdx/help');
  const category = ordered.find((cat) => cat.slug === params.category);

  if (!category) return <div>404</div>;

  return (
    <>
      <div className="from-brand-gradient-3/50 bg-gradient-to-tr to-transparent py-20">
        <div className="mx-auto w-10/12 max-w-7xl">
          <h1 className="text-5xl font-bold drop-shadow-md">{category.name}</h1>
          <p className="text-text-primary mt-5 text-lg">
            {category?.description}
          </p>
        </div>
      </div>

      <div className="mx-auto w-11/12 max-w-7xl pb-24 pt-8">
        <Link href="/help">
          <Button label="Back" variant="primary-outline" />
        </Link>
        <div className="">
          <Section
            name={category.name}
            slug={category.slug}
            description={category.description}
            items={category.items.filter((item) => !item.items)}
          />
          {category.items
            .filter((item) => item.items)
            .map((item, index) => (
              <Section
                key={index}
                name={item.name}
                slug={`${category.slug}/${item.slug}`}
                description={item.description as string}
                items={item.items}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default HelpCategory;
