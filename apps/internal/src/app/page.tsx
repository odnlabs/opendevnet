import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Internal Docs | Open Dev Net',
};

import { DocumentContent } from '@components';
import { mdxApi } from '@odnlabs/utils';

const Home = async (): Promise<JSX.Element> => {
  const doc = await mdxApi.getDocFromSlug('introduction', 'mdx/introduction');

  if (!doc) {
    redirect('/404');
  }

  return <DocumentContent doc={doc} />;
};

export default Home;
