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
      description: 'Learn the basics of Open Dev Net and you can start using it effectively today.',
      href: 'getting-started'
    },
    {
      title: 'Network Administration',
      description: '',
      href: 'administration'
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
    }
  ]

return <>
  <div className="py-10 bg-gradient-to-tr from-brand-gradient-3 to-brand-gradient-4">
    <div className="text-center max-w-5xl w-11/12 max-w-auto">
      <h1 className="font-bold text-4xl">Help Center</h1>
      <Input placeholder="What do you need help with?"/>
    </div>
  </div>
</>};

export default Help;
