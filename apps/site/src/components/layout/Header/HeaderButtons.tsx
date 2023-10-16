import Link from 'next/link';

import { Button } from '@components';

export const HeaderButtons: React.FC = () => (
  <div className="flex my-3">
    <Link href="/register" className="mr-2 hidden md:inline-block group">
      <Button label="Register" variant="secondary" link />
    </Link>
    <Link href="/login" className="group">
      <Button label="Log In" link />
    </Link>
  </div>
);
