import { Metadata, NextPage } from 'next';

import { DocumentContent } from '@components';
import { getDocFromSlug } from '@utils/docsApi';

const fileName = 'privacy';
const fileDir = 'src/constants/policies';

export const generateMetadata = async (): Promise<Metadata> => {
  const { meta } = await getDocFromSlug(fileName, fileDir);
  return {
    title: `${meta.title} | Open Dev Net`,
  };
};

const Privacy: NextPage = async () => {
  const doc = await getDocFromSlug(fileName, fileDir);

  return (
    <div className="my-20 max-w-3xl mx-auto w-11/12">
      <DocumentContent doc={{ source: doc.source, title: doc.meta.title }} />
    </div>
  );
};

export default Privacy;
