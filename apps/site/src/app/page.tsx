import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Open Dev Net',
};

export default function Home() {
  return (
    <div className="mt-20">
      <h1 className="text-center text-3xl font-bold">Home Page</h1>
    </div>
  );
}
