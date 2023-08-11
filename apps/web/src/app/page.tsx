import { Button } from '@odnlabs/ui';

export const metadata = {
  title: 'Home | Open Dev Net',
};

export default function Page() {
  return (
    <>
      <p className="text-4xl font-bold uppercase bg-blue-500">Hello world</p>
      <Button title="Submit" />
    </>
  );
}
