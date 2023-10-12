'use client';

import { Button } from '@odnlabs/ui';
import Link from 'next/link';

export const HomepageButtons: React.FC = () => (
  <>
    <div className="mt-10 flex justify-center">
      <Link href="/register">
        <Button label="Create Account" variant="primary-outline" size="lg" />
      </Link>
      <div className="w-4"></div>
      <Link href="/login">
        <Button label="Log In" size="lg" />
      </Link>
    </div>
  </>
);
