import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { DocumentContent } from '@components';
import { mdxApi } from '@odnlabs/utils-server';

export const generateMetadata = async (): Promise<Metadata> => {
  const doc = await mdxApi.getDocFromDirectSlug('../../docs/policies/terms');

  if (!doc) {
    return {
      title: 'Not Found | Open Dev Net',
    };
  }

  return {
    title: `${doc.meta.title} | Open Dev Net`,
  };
};

const Terms = async (): Promise<JSX.Element> => {
  const doc = await mdxApi.getDocFromDirectSlug('../../docs/policies/terms');

  if (!doc) return redirect('/404');

  return (
    <DocumentContent
      doc={doc}
      editLink="https://github.com/odnlabs/opendevnet/blob/dev/docs/policies/terms.mdx"
    />
  );
};

export default Terms;
