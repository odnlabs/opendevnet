import Link from 'next/link';
import { Button } from '../uiClientComponents';

interface ComingSoonProps {}

export const ComingSoon: React.FC<ComingSoonProps> = () => (
  <div className="mx-auto my-20 mb-10 w-11/12 max-w-3xl text-center md:my-40">
    <h1 className="text-6xl font-light uppercase">Coming Soon</h1>
    <p className="text-text-secondary mx-auto mt-8 max-w-sm">
      We&apos;re currently working on creating something amazing that will be
      here!
    </p>
    <div className="mt-10 text-center">
      <Link href="/">
        <Button label="Home Page" size="lg" />
      </Link>
    </div>
  </div>
);
