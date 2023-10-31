import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { DocumentContent } from '@components';
import { getDocFromSlug } from '@utils/mdxApi';

const fileName = 'terms';
const fileDir = 'mdx/policies';

export const generateMetadata = async (): Promise<Metadata> => {
  const doc = await getDocFromSlug(fileName, fileDir);

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
  const doc = await getDocFromSlug(fileName, fileDir);

  if (!doc) return redirect('/404');

  return (
    <div className="mt-10 lg:mt-20 mb-20 lg:mb-28 xl:mb-52 max-w-3xl mx-auto w-11/12">
      <DocumentContent doc={doc} />
    </div>
  );
};

export default Terms;
