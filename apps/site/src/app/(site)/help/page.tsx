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
      <div className="from-brand-gradient-3/50 bg-gradient-to-tr to-transparent py-20">
        <div className="mx-auto w-10/12 max-w-xl text-center">
          <h1 className="text-5xl font-bold drop-shadow-md">Help Center</h1>
          <Input
            placeholder="What do you need help with?"
            size="lg"
            className="mt-10 shadow-lg"
            icon={'search'}
          />
        </div>
      </div>

      <div className="mx-auto w-11/12 max-w-7xl pb-24 pt-14">
        <h1 className="px-5 text-2xl font-bold">Categories</h1>
        <div className="mt-2 flex flex-wrap justify-start">
          {ordered.map((category, index) => (
            <div key={index} className={`w-1/3 p-5`}>
              <div className="bg-background-secondary border-border relative h-full rounded-lg border p-10">
                <h1 className="text-lg font-medium">{category.name}</h1>
                <p className="text-text-faint mb-16 mt-2 text-sm">
                  {category.description}
                </p>
                <div className="absolute bottom-10 left-10">
                  <Link
                    href={`/help/${category.slug}`}
                    className="group inline-block"
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
