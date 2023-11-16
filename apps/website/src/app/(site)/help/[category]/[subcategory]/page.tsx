import { Metadata } from 'next';
import Link from 'next/link';

import { Button, DocumentContent } from '@components';
import { Item, SubItem } from '@odnlabs/utils-client';
import { mdxApi } from '@odnlabs/utils-server';

interface Params {
  category: string;
  subcategory: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<Metadata> => {
  const doc = await mdxApi
    .getDocFromSlug('mdx/help', `${params.category}/${params.subcategory}`)
    .catch(() => undefined);

  if (doc) {
    return {
      title: `${doc.meta.title} | Open Dev Net`,
    };
  }

  const ordered = await mdxApi.getOrderedSlugs('mdx/help');
  const category = ordered.find((cat) => cat.slug === params.category);
  if (!category) {
    return {
      title: 'Not Found',
    };
  }
  const subcategory = category?.items.find(
    (subcat) => subcat.slug === params.subcategory
  );

  if (subcategory) {
    return {
      title: `Help Center - ${subcategory.name} | Open Dev Net`,
    };
  }

  return {
    title: 'Not Found',
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
      <h2 className="text-2xl font-semibold">{name}</h2>
      <p className="text-text-secondary mt-3">{description}</p>
      <div className="border-border mt-5 border-t pt-2">
        {items.map((item, index) => (
          <div className="my-2" key={index}>
            <Link className="link" href={`/help/${slug}/${item.slug}`}>
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
  const doc = await mdxApi
    .getDocFromSlug('mdx/help', `${params.category}/${params.subcategory}`, {
      nextAndPrev: true,
    })
    .catch(() => undefined);

  if (doc) return <DocumentContent doc={doc} />;

  const ordered = await mdxApi.getOrderedSlugs('mdx/help');
  const category = ordered.find((cat) => cat.slug === params.category);
  if (!category) return <div>404</div>;
  const subcategory = category?.items.find(
    (subcat) => subcat.slug === params.subcategory
  );
  if (!subcategory) return <div>404</div>;

  return (
    <>
      <div className="from-brand-gradient-3/50 bg-gradient-to-tr to-transparent py-20">
        <div className="mx-auto w-10/12 max-w-7xl">
          <h1 className="text-5xl font-bold drop-shadow-md">
            {subcategory.name}
          </h1>
          <p className="text-text-primary mt-5 text-lg">
            {subcategory.description}
          </p>
        </div>
      </div>
      <div className="mx-auto w-11/12 max-w-7xl pb-24 pt-8">
        <Link href={`/help/${category.slug}`}>
          <Button label="Back" variant="primary-outline" />
        </Link>
        <div className="">
          <Section
            description={subcategory.description as string}
            items={subcategory.items}
            name={subcategory.name}
            slug={`${category.slug}/${subcategory.slug}`}
          />
        </div>
      </div>
    </>
  );
};

export default HelpCategory;
