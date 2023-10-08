import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vision | Open Dev Net',
};

export default function Vision() {
  const paragraphStyle = 'my-3 text-text-primary font-light';
  const headerStyle = 'mt-8 text-2xl font-semibold';
  const subheaderStyle = 'mt-5 text-xl font-medium';

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-semibold text-center">Vision</h1>
      <div className="mt-5">
        <p className={paragraphStyle}>Coming soon.</p>
      </div>
    </div>
  );
}
