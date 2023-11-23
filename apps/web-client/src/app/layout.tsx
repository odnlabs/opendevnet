import { Poppins } from 'next/font/google';

import { config } from '@odnlabs/utils-server';

import { DataLayer } from '@components/layout/DataLayer';
import { Providers } from '@components/layout/Providers';
import { Header, NavigationBar } from '@components/layout/index';

import '@odnlabs/ui/styles.css';
import '../styles/globals.css';

const font = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'latin-ext'],
});

export const metadata = {
  title: 'Open Dev Net',
  description:
    'The open-source social platform for developers to collaborate, find opportunities, and streamline workflows.',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <head>
      <link href="/app/favicon.ico" rel="icon" sizes="any" />
    </head>
    <Providers>
      <DataLayer website={config.website}>
        <body className={font.className}>
          <div className="relative h-14" />
          <div className="flex">
            <Header />
            <NavigationBar website={config.website} />
            {children}
          </div>
        </body>
      </DataLayer>
    </Providers>
  </html>
);

export default RootLayout;
