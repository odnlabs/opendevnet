'use client';

import { Metadata } from 'next';

import { Button } from '@odnlabs/ui';

export const metadata: Metadata = {
  title: 'Home | Open Dev Net',
};

export default function Home() {
  return (
    <div className="max-w-7xl w-11/12 mx-auto my-20">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold text-text-secondary">
          Connecting Developers
        </h1>
        <h1 className="mt-4 text-5xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-gradient-1 to-brand-gradient-2">
            Across the World
          </span>
        </h1>
        <p className="text-text-secondary my-8">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
          consectetur hic, consequuntur, velit ut quaerat, illum nam laudantium
          quod exercitationem est magni eius. Suscipit dolor laboriosam tempore
          consectetur, sit iste?
        </p>
        <div className="mt-10 flex">
          <Button label="Log In" variant="secondary" size="lg" />
          <div className="w-4"></div>
          <Button label="Get Started" size="lg" />
        </div>
      </div>
    </div>
  );
}
