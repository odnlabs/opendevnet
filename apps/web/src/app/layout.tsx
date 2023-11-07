import { Poppins } from 'next/font/google';

import { config } from '@odnlabs/utils-server';

import { Header, NavigationBar } from '@components/layout';
import { DataLayer } from '@components/layout/DataLayer';
import { Providers } from '@components/layout/Providers';

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
      <link rel="icon" href="/app/favicon.ico" sizes="any" />
    </head>
    <Providers>
      <DataLayer site={config.site}>
        <body className={font.className}>
          <div className="relative h-14"></div>
          <div className="flex">
            <Header />

            <NavigationBar site={config.site} />

            {children}
          </div>
        </body>
      </DataLayer>
    </Providers>
  </html>
);

export default RootLayout;
