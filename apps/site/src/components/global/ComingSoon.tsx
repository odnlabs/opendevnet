import Link from 'next/link';
import { Button } from '../uiClientComponents';

interface ComingSoonProps {}

export const ComingSoon: React.FC<ComingSoonProps> = () => (
  <div className="my-20 md:my-40 mb-10 max-w-3xl w-11/12 mx-auto text-center">
    <h1 className="font-light text-6xl uppercase">Coming Soon</h1>
    <p className="mt-8 text-text-secondary max-w-sm mx-auto">
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
