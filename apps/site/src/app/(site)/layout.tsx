import { Header } from '@components/layout';
import { Footer } from 'src/components/layout/Footer';

const SiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Header />
    <div className="min-h-[80vh]">{children}</div>
    <Footer />
  </>
);

export default SiteLayout;
