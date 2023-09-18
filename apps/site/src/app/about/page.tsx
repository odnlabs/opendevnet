import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | Open Dev Net',
};

export default function About() {
  return (
    <div className="">
      <Link href="/about/devs" className="link">
        Developers
      </Link>
    </div>
  );
}
