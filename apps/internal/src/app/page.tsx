import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internal Docs | Open Dev Net',
};

import { DocumentContent } from '@components';
import { getDocFromSlug } from '@utils/mdxApi';

const Home = async (): Promise<JSX.Element> => {
  const doc = await getDocFromSlug('introduction', 'mdx/introduction');

  return <DocumentContent doc={doc} />;
};

export default Home;
