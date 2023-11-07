import { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { config } from '@odnlabs/utils-server';

import { Footer, Header, Sidebar } from '@components/layout';

import '@odnlabs/ui/styles.css';
import '@odnlabs/ui/styles/code.css';
import '../styles/globals.css';

const font = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
  title: 'Internal Docs | Open Dev Net',
  description:
    'Internal docs for the open-source social platform for developers to collaborate, find opportunities, and streamline workflows.',
};

const socialUrls = {
  github: config.social.github,
  linkedin: config.social.linkedin,
  youtube: config.social.youtube,
  email: config.social.email,
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <head>
      <link rel="icon" href="/internal/favicon.ico" sizes="any" />
    </head>

    <body className={font.className}>
      <Header />

      <div className="flex">
        <Sidebar />

        <div className="relative right-0 top-0 md:w-[calc(100vw-280px)]">
          {children}
          <Footer socialUrls={socialUrls} site={config.site} />
        </div>
      </div>
    </body>
  </html>
);

export default RootLayout;
