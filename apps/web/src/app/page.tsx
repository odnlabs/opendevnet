import { Button } from '@components';

export const metadata = {
  title: 'Home | Open Dev Net',
};

export default function Page() {
  return (
    <>
      <p className="text-4xl font-bold uppercase bg-primary text-text-button">
        Hello world
      </p>
      <Button title="Submit" />
    </>
  );
}
