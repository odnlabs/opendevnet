'use client';

import { Button } from '@odnlabs/ui';
import Link from 'next/link';

export const HomepageButtons: React.FC = () => (
  <>
    <div className="mt-10 flex justify-center">
      <Link href="/register" className="group">
        <Button
          label="Create Account"
          variant="primary-outline"
          size="lg"
          link
        />
      </Link>
      <div className="w-4"></div>
      <Link href="/login" className="group">
        <Button label="Log In" size="lg" link />
      </Link>
    </div>
  </>
);
