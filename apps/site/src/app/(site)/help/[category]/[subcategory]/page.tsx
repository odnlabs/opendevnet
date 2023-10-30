import { Metadata } from 'next';
import Link from 'next/link';

import { Button, DocumentContent } from '@components';
import {
  Item,
  SubItem,
  getDocFromSlug,
  getOrderedSlugs,
} from '@utils/helpDocApi';

export const metadata: Metadata = {
  title: 'Help Center | Open Dev Net',
};

interface Params {
  category: string;
  subcategory: string;
}

const Section: React.FC<{
  name: string;
  description: string;
  slug: string;
  items: (SubItem | Item)[] | undefined;
}> = ({ name, slug, description, items }) =>
  items && (
    <div className="bg-background-secondary p-8 mt-8 rounded-lg border border-border">
      <h2 className="font-semibold text-2xl">{name}</h2>
      <p className="mt-3 text-text-secondary">{description}</p>
      <div className="mt-5 pt-2 border-t border-border">
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
  const doc = await getDocFromSlug(
    params.subcategory,
    `mdx/help/${params.category}`
  );

  if (doc) return <DocumentContent doc={doc} />;

  const ordered = await getOrderedSlugs('mdx/help');
  const category = ordered.find((cat) => cat.slug === params.category);
  if (!category) return <div>404</div>;
  const subcategory = category?.items.find(
    (subcat) => subcat.slug === params.subcategory
  );
  if (!subcategory) return <div>404</div>;

  return (
    <>
      <div className="py-20 bg-gradient-to-tr from-brand-gradient-3/50 to-transparent">
        <div className="max-w-7xl w-10/12 mx-auto">
          <h1 className="font-bold text-5xl drop-shadow-md">
            {subcategory.name}
          </h1>
          <p className="mt-5 text-text-primary text-lg">
            {subcategory.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl w-11/12 mx-auto pt-8 pb-24">
        <Link href={`/help/${category.slug}`}>
          <Button label="Back" variant="primary-outline" />
        </Link>
        <div className="">
          <Section
            name={subcategory.name}
            slug={subcategory.slug}
            description={subcategory.description as string}
            items={subcategory.items}
          />
        </div>
      </div>
    </>
  );
};

export default HelpCategory;
