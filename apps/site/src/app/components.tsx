'use client';

import { Button } from '@odnlabs/ui';

export const HomepageButtons: React.FC = () => {
  return (
    <>
      <div className="mt-10 flex justify-center">
        <Button label="Log In" variant="secondary" size="lg" />
        <div className="w-4"></div>
        <Button label="Get Started" size="lg" />
      </div>
    </>
  );
};
