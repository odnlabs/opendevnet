'use client';

import Link from 'next/link';

import { Button } from '@odnlabs/ui';

export const HomepageButtons: React.FC = () => (
  <div className="mt-10 flex justify-center">
    <Link className="group" href="/register">
      <Button label="Create Account" link size="lg" variant="secondary" />
    </Link>
    <div className="w-4" />
    <Link className="group" href="/login">
      <Button label="Log In" link size="lg" />
    </Link>
  </div>
);
