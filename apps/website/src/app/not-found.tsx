import { Metadata, NextPage } from 'next';
import Link from 'next/link';

import { Button } from '@components';

export const metadata: Metadata = {
  title: 'Page Not Found | Open Dev Net',
};

const NotFound: NextPage = () => (
  <div className="absolute left-1/2 top-1/2 max-w-lg -translate-x-1/2 -translate-y-2/3 text-center">
    <h1 className="text-4xl">Page Not Found</h1>
    <p className="text-text-secondary mx-auto mb-10 mt-8 max-w-md">
      Oops! We can&apos;t seem to find the page you&apos;re looking for. Try
      going back to the previous page or see our{' '}
      <Link className="link" href="/help">
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
