'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@components';

interface Props {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

const Error: React.FC<Props> = ({ error, reset }) => {
  useEffect(() => {
    console.log('Error', error);
  }, [error]);

  return (
    <div className="absolute left-1/2 top-1/2 max-w-lg -translate-x-1/2 -translate-y-2/3 text-center">
      <h1 className="text-4xl">An Error Occured</h1>
      <p className="text-text-secondary mx-auto mb-10 mt-8 max-w-md">
        Oops! It seems that something went wrong. <br /> Try going back to the
        previous page or see our{' '}
        <Link className="link" href="/help">
          Help Center
        </Link>{' '}
        for more information.
      </p>
      <div className="flex justify-center">
        <Link href="/">
          <Button label="Home Page" />
        </Link>
        <div className="w-2" />
        <Button
          label="Try Again"
          onClick={() => reset()}
          variant="danger-outline"
        />
      </div>
    </div>
  );
};

export default Error;
