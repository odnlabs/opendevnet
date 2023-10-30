import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { DocumentContent } from '@components';
import { getDocFromSlug } from '@utils/helpDocApi';

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
  const doc = await getDocFromSlug(
    params.slug,
    `mdx/help/${params.category}/${params.subcategory}`
  ).catch(() => undefined);

  if (!doc)
    return {
      title: 'Not Found',
    };

  return {
    title: `${doc.meta.title} | Open Dev Net`,
  };
};

const Document = async ({
  params,
}: {
  params: Params;
}): Promise<JSX.Element> => {
  const doc = await getDocFromSlug(
    params.slug,
    `mdx/help/${params.category}/${params.subcategory}`
  ).catch(() => undefined);

  if (!doc) redirect('/404');

  return <DocumentContent doc={doc} />;
};

export default Document;
