import { Metadata, NextPage } from 'next';

import { Input } from '@components';

export const metadata: Metadata = {
  title: 'Help Center | Open Dev Net',
};

const Help: NextPage = () => {
  interface CategoryLink {
    title: string;
    description: string;
    href: string;
  }

  const categories: CategoryLink[] = [
    {
      title: 'Getting Started',
      description:
        'Learn the basics of Open Dev Net and you can start using it effectively today.',
      href: 'getting-started',
    },
    {
      title: 'Network Administration',
      description: '',
      href: 'administration',
    },
    {
      title: 'Personal Customization',
      description: '',
      href: 'customization',
    },
    {
      title: 'Automation',
      description: '',
      href: 'automation',
    },
  ];

  return (
    <>
      <div className="py-20 bg-gradient-to-tr from-brand-gradient-3/50 to-transparent">
        <div className="text-center max-w-xl w-10/12 mx-auto">
          <h1 className="font-bold text-5xl drop-shadow-md">Help Center</h1>
          <Input
            placeholder="What do you need help with?"
            size="lg"
            className="mt-10 shadow-lg"
            icon={'search'}
          />
        </div>
      </div>

      <div className="max-w-7xl w-11/12 mx-auto py-20">
        {categories.map((category, index) => (
          <></>
        ))}
      </div>
    </>
  );
};

export default Help;
