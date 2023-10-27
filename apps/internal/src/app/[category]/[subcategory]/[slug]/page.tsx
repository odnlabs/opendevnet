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

  return (
    <div className="mt-10 lg:mt-20 mb-20 lg:mb-28 xl:mb-52 max-w-3xl mx-auto w-11/12">
      <DocumentContent doc={{ source: doc.source, title: doc.meta.title }} />
    </div>
  );
};

export default Page;
