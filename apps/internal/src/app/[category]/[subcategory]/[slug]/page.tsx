import { Metadata } from 'next';

import { DocumentContent } from '@components';
import { getDocFromSlug } from '@utils/mdxApi';

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
  const { meta } = await getDocFromSlug(
    params.slug,
    `mdx/${params.category}/${params.subcategory}`
  );
  return {
    title: `${meta.title} | Open Dev Net`,
  };
};

const Page = async ({ params }: { params: Params }): Promise<JSX.Element> => {
  const doc = await getDocFromSlug(
    params.slug,
    `mdx/${params.category}/${params.subcategory}`
  );

  return <DocumentContent doc={doc} />;
};

export default Page;
