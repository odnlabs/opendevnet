import { Metadata, NextPage } from 'next';

import { Input } from '@components';

export const metadata: Metadata = {
  title: 'Help Center | Open Dev Net',
};

const Help: NextPage = () => {
  interface BlockLink {
    title: string;
    description: string;
    href: string;
  }

  const links: BlockLink[] = [
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
      <div className="py-10 bg-gradient-to-tr from-brand-gradient-3 to-brand-gradient-4">
        <div className="text-center max-w-5xl w-11/12 mx-auto">
          <h1 className="font-bold text-5xl">Help Center</h1>
          <Input
            placeholder="What do you need help with?"
            size="lg"
            className="mt-5"
          />
        </div>
      </div>

      <div className="max-w-7xl w-11/12 mx-auto py-20">
        {links.map((link, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10"
          >
            <div className="lg:w-1/2">
              <h2 className="font-bold text-2xl mb-2">{link.title}</h2>
              <p className="text-text-faint">{link.description}</p>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center">
              <a
                href={`/help/${link.href}`}
                className="bg-brand-gradient-3 text-white rounded-md py-2 px-4 text-sm font-bold mb-4 lg:mb-0 lg:mr-4"
              >
                View
              </a>
              <a
                href={`/help/${link.href}`}
                className="text-brand-gradient-3 text-sm font-bold"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Help;
