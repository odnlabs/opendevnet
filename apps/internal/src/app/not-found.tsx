import { Metadata, NextPage } from 'next';
import Link from 'next/link';

import { Button } from '@components';

export const metadata: Metadata = {
  title: 'Page Not Found | Open Dev Net',
};

const NotFound: NextPage = () => (
  <div className="max-w-lg text-center absolute top-1/2 left-1/2 -translate-y-2/3 -translate-x-1/2">
    <h1 className="text-4xl">Page Not Found</h1>
    <p className="mt-8 mb-10 text-text-secondary max-w-md mx-auto">
      Oops! We can&apos;t seem to find the page you&apos;re looking for. Try
      going back to the previous page or see our{' '}
      <Link href="/help" className="link">
        Help Center
      </Link>{' '}
      for more information.
    </p>
    <Link href="/">
      <Button label="Home Page" />
    </Link>
  </div>
);

export default NotFound;
