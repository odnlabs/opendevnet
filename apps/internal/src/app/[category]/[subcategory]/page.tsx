// NOTE - Subcategory can also be a slug for a page, so we need to check if the subcategory is a page or not

import { Metadata } from 'next';

import { DocumentContent } from '@components';
import { getDocFromSlug } from '@utils/mdxApi';

interface Params {
  category: string;
  subcategory: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<Metadata> => {
  const { meta } = await getDocFromSlug(
    params.subcategory,
    `mdx/${params.category}`
  );
  return {
    title: `${meta.title} | Open Dev Net`,
  };
};

const Page = async ({ params }: { params: Params }): Promise<JSX.Element> => {
  const doc = await getDocFromSlug(
    params.subcategory,
    `mdx/${params.category}`
  );

  return <DocumentContent doc={doc} />;
};

export default Page;
