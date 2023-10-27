import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internal Docs | Open Dev Net',
};

import { DocumentContent } from '@components';
import { getDocFromSlug } from '@utils/mdxApi';

const Home = async (): Promise<JSX.Element> => {
  const doc = await getDocFromSlug('introduction', 'mdx/introduction');

  return (
    <div className="mt-10 lg:mt-20 mb-20 lg:mb-28 xl:mb-52 max-w-3xl mx-auto w-11/12">
      <DocumentContent doc={{ source: doc.source, title: doc.meta.title }} />
    </div>
  );
};

export default Home;
