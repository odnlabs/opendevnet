import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { DocumentContent } from '@components';
import { mdxApi } from '@odnlabs/utils-server';

interface Params {
  category: string;
  subcategory: string;
  slug: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<Metadata> => {
  const doc = await mdxApi
    .getDocFromSlug(
      '../../docs/help',
      `${params.category}/${params.subcategory}/${params.slug}`
    )
    .catch(() => undefined);

  if (!doc) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${doc.meta.title} | Open Dev Net`,
  };
};

const Document = async ({
  params,
}: {
  params: Params;
}): Promise<JSX.Element> => {
  const doc = await mdxApi
    .getDocFromSlug(
      '../../docs/help',
      `${params.category}/${params.subcategory}/${params.slug}`,
      { nextAndPrev: true }
    )
    .catch(() => undefined);

  if (!doc) redirect('/404');

  return <DocumentContent doc={doc} />;
};

export default Document;
