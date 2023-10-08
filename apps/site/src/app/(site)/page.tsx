import { Metadata } from 'next';

import { HomepageButtons } from './components';

export const metadata: Metadata = {
  title: 'Home | Open Dev Net',
};

export default function Home() {
  return (
    <div>
      <div className="max-w-7xl w-11/12 mx-auto py-32">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-text-secondary">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-gradient-1 to-brand-gradient-2">
              Connecting Developers
            </span>
          </h1>
          <h1 className="mt-5 text-5xl font-bold">
            <span>Across the World</span>
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-text-secondary my-8">
              Welcome to Open Dev Net, where programmers from all corners of the
              globe collaborate, innovate, and code for a better future. Join us
              in connecting minds, creating solutions, and making a positive
              impact on the world.
            </p>
            <HomepageButtons />
          </div>
        </div>
      </div>
      <div className="py-10 bg-background-secondary text-center">
        <p className="font-medium text-text-secondary text-xl">
          "The social platform for creators, innovators, and developers."
        </p>
      </div>
    </div>
  );
}
