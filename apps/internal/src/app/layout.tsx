import { Poppins } from 'next/font/google';

import { Metadata } from 'next';

import { Footer, Header, Sidebar } from '@components/layout';

import '@odnlabs/ui/styles.css';
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

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
    </head>

    <body className={font.className}>
      <Header />

      <div className="flex">
        <Sidebar />

        <div>
          {children}
          <Footer />
        </div>
      </div>
    </body>
  </html>
);

export default RootLayout;
