import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { DocumentContent } from '@components';
import { mdxApi } from '@odnlabs/utils';

const fileName = 'privacy';
const fileDir = 'mdx/policies';

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

const Privacy = async (): Promise<JSX.Element> => {
  const doc = await mdxApi.getDocFromSlug(fileName, fileDir);

  if (!doc) return redirect('/404');

  return <DocumentContent doc={doc} />;
};

export default Privacy;
