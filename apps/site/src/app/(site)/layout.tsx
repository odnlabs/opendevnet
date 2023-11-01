import { Header } from '@components/layout';
import { Footer } from 'src/components/layout/Footer';

import { config } from '@odnlabs/utils';

const socialUrls = {
  github: config.social.github,
  linkedin: config.social.linkedin,
  youtube: config.social.youtube,
  email: config.social.email,
};

const SiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Header />
    <div className="min-h-[80vh]">{children}</div>
    <Footer socialUrls={socialUrls} />
  </>
);

export default SiteLayout;
