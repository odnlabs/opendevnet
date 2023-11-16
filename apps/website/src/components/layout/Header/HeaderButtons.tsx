import Link from 'next/link';

import { Button } from '@components';

export const HeaderButtons: React.FC = () => (
  <div className="my-3 flex">
    <Link className="group mr-2 hidden md:inline-block" href="/register">
      <Button label="Register" link variant="secondary" />
    </Link>
    <Link className="group" href="/login">
      <Button label="Log In" link />
    </Link>
  </div>
);
