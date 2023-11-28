import { Header } from '@components/layout/Header';
import { Footer } from 'src/components/layout/Footer';

import { config } from '@odnlabs/utils-server';

const socialUrls = {
  github: config.social.github,
  linkedin: config.social.linkedin,
  youtube: config.social.youtube,
  email: config.social.email,
};

const SiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Header />
    <main className="min-h-[80vh]" id="main" tabIndex={0}>
      {children}
    </main>
    <Footer internalDocs={config.internalDocs} socialUrls={socialUrls} />
  </>
);

export default SiteLayout;
