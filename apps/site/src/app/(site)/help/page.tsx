import { Metadata, NextPage } from 'next';
import Link from 'next/link';

import { Button, Input } from '@components';
import { mdxApi } from '@odnlabs/utils';

export const metadata: Metadata = {
  title: 'Help Center | Open Dev Net',
};

const Help: NextPage = async () => {
  const ordered = await mdxApi.getOrderedSlugs('mdx/help');

  return (
    <>
      <div className="py-20 bg-gradient-to-tr from-brand-gradient-3/50 to-transparent">
        <div className="text-center max-w-xl w-10/12 mx-auto">
          <h1 className="font-bold text-5xl drop-shadow-md">Help Center</h1>
          <Input
            placeholder="What do you need help with?"
            size="lg"
            className="mt-10 shadow-lg"
            icon={'search'}
          />
        </div>
      </div>

      <div className="max-w-7xl w-11/12 mx-auto pt-14 pb-24">
        <h1 className="font-bold text-2xl px-5">Categories</h1>
        <div className="mt-2 flex flex-wrap justify-start">
          {ordered.map((category, index) => (
            <div key={index} className={`w-1/3 p-5`}>
              <div className="relative bg-background-secondary h-full border border-border p-10 rounded-lg">
                <h1 className="text-lg font-medium">{category.name}</h1>
                <p className="mt-2 text-sm text-text-faint mb-16">
                  {category.description}
                </p>
                <div className="absolute bottom-10 left-10">
                  <Link
                    href={`/help/${category.slug}`}
                    className="inline-block group"
                  >
                    <Button label="View All" variant="primary-outline" link />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Help;
