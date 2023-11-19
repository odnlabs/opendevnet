import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { DocumentContent } from '@components';
import { mdxApi } from '@odnlabs/utils-server';

export const generateMetadata = async (): Promise<Metadata> => {
  const doc = await mdxApi.getDocFromDirectSlug('../../docs/policies/privacy');

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
  const doc = await mdxApi.getDocFromDirectSlug('../../docs/policies/privacy');

  if (!doc) return redirect('/404');

  return (
    <DocumentContent
      doc={doc}
      editLink="https://github.com/odnlabs/opendevnet/blob/dev/docs/policies/privacy.mdx"
    />
  );
};

export default Privacy;
