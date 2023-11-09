import Link from 'next/link';

import { Button } from '@components';

export const HeaderButtons: React.FC = () => (
  <div className="my-3 flex">
    <Link href="/register" className="group mr-2 hidden md:inline-block">
      <Button label="Register" variant="secondary" link />
    </Link>
    <Link href="/login" className="group">
      <Button label="Log In" link />
    </Link>
  </div>
);
