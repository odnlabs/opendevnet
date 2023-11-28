import { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { config } from '@odnlabs/utils-server';

import { Footer, Header, Sidebar } from '@components/layout';

import '@odnlabs/ui/styles.css';
import '@odnlabs/ui/styles/code.css';
import { AccessibilityShortcuts } from 'src/components/layout/AccessibilityShortcuts';
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
      <link href="/internal-docs/favicon.ico" rel="icon" sizes="any" />
    </head>
    <body className={font.className} tabIndex={-1}>
      <AccessibilityShortcuts website={config.website} />
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="relative right-0 top-0 md:w-[calc(100vw-280px)]">
          <main className="relative min-h-[75vh]" id="main" tabIndex={0}>
            {children}
          </main>
          <Footer socialUrls={socialUrls} website={config.website} />
        </div>
      </div>
    </body>
  </html>
);

export default RootLayout;
