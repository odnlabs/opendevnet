import { Header } from '@components/layout';
import { Footer } from 'src/components/layout/Footer';

export const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <>
    <Header />
    <div className="min-h-[80vh]">{children}</div>
    <Footer />
  </>
);
