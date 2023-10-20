import { structurePaths } from '@utils/docsApi';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help Center | Open Dev Net',
};

const HelpCategory: React.FC = async () => {
  const data = await structurePaths('src/markdown/help');

  console.log(data);

  return <></>;
};

export default HelpCategory;
