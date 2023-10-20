import { Metadata, NextPage } from 'next';
import Link from 'next/link';

import { Button, Input } from '@components';

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
      description:
        'Manage online spaces effectively, from communities to workspaces, ensuring smooth operations and growth.',
      href: 'administration',
    },
    {
      title: 'Account Settings',
      description:
        ' Customize your experience with themes and preferences, making our platform truly yours.',
      href: 'account',
    },
    {
      title: 'Automation',
      description:
        'Enhance productivity with automated tasks and workflows, simplifying your online life.',
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

      <div className="max-w-7xl w-11/12 mx-auto pt-14 pb-24">
        <h1 className="font-bold text-2xl px-5">Categories</h1>
        <div className="mt-2 flex flex-wrap justify-start">
          {categories.map((category, index) => (
            <div key={index} className={`w-1/3 p-5`}>
              <div className="relative bg-background-secondary h-full border border-border p-10 rounded-lg">
                <h1 className="text-lg font-medium">{category.title}</h1>
                <p className="mt-2 text-sm text-text-faint mb-16">
                  {category.description}
                </p>
                <div className="absolute bottom-10 left-10">
                  <Link
                    href={`/help/${category.href}`}
                    className="inline-block group"
                  >
                    <Button label="View All" variant="primary-glass" link />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Help;
