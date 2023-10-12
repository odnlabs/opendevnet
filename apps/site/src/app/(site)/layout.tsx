import { Header } from '@components/layout';
import { Footer } from 'src/components/layout/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <Header />
      <div className="min-h-[80vh]">{children}</div>
      <Footer />
    </>
  );
}
