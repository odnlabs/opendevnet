import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { DocumentContent } from '@components';
import { mdxApi } from '@odnlabs/utils';

const fileDir = 'mdx/policies';
const fileName = 'accessibility';

export const generateMetadata = async (): Promise<Metadata> => {
  const doc = await mdxApi.getDocFromSlug(fileName, fileDir);

  if (!doc) {
    return {
      title: 'Not Found | Open Dev Net',
    };
  }

  return {
    title: `${doc.meta.title} | Open Dev Net`,
  };
};

const Accessibility = async (): Promise<JSX.Element> => {
  const doc = await mdxApi.getDocFromSlug(fileName, fileDir);

  if (!doc) return redirect('/404');

  return <DocumentContent doc={doc} />;
};

export default Accessibility;
