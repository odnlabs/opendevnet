'use client';

import Link from 'next/link';
import { ReactElement, useEffect } from 'react';

import { Button } from '@components';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): ReactElement {
  useEffect(() => {
    console.log('Error', error);
  }, [error]);

  return (
    <div className="max-w-lg text-center absolute top-1/2 left-1/2 -translate-y-2/3 -translate-x-1/2">
      <h1 className="text-4xl">An Error Occured</h1>
      <p className="mt-8 mb-10 text-text-secondary max-w-md mx-auto">
        Oops! It seems that something went wrong. Try going back to the previous
        page or see our{' '}
        <Link href="/help" className="link">
          Help Center
        </Link>{' '}
        for more information.
      </p>
      <div className="flex justify-center">
        <Link href="/">
          <Button label="Home Page" />
        </Link>
        <div className="w-2"></div>
        <Button
          label="Try Again"
          onClick={() => reset()}
          variant="danger-outline"
        />
      </div>
    </div>
  );
}
