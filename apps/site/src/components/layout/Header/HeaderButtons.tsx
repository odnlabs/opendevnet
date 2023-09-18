'use client';

import Link from 'next/link';

import { Button } from '@odnlabs/ui';

export const HeaderButtons: React.FC = () => {
  return (
    <div className="flex my-3">
      <Link href="/register" className="mr-2">
        <Button label="Register" variant="secondary" />
      </Link>
      <Link href="/login">
        <Button label="Login" />
      </Link>
    </div>
  );
};
