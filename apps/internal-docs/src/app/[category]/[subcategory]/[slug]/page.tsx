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
  const doc = await mdxApi.getDocFromSlug(
    '../../docs/internal',
    `${params.category}/${params.subcategory}/${params.slug}`
  );

  if (!doc) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${doc.meta.title} | Open Dev Net`,
  };
};

const Page = async ({ params }: { params: Params }): Promise<JSX.Element> => {
  const doc = await mdxApi.getDocFromSlug(
    '../../docs/internal',
    `${params.category}/${params.subcategory}/${params.slug}`,
    { nextAndPrev: true }
  );

  if (!doc) redirect('/404');

  return <DocumentContent doc={doc} />;
};

export default Page;
