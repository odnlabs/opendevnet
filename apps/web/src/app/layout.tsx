import '@odnlabs/ui/styles.css';
import { Poppins } from 'next/font/google';

import {
  Header,
  NavigationBar,
  Sidebar,
  ToastWrapper,
} from '@components/layout';
import { Providers } from 'src/components/layout/Providers';
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
      <link rel="icon" href="/favicon.ico" sizes="any" />
    </head>
    <Providers>
      <body className={font.className}>
        <ToastWrapper />

        <div className="relative h-14"></div>
        <div className="flex">
          <Header />

          <NavigationBar />

          <Sidebar />

          <div className="flex-grow">
            <div className="min-h-[80vh]">{children}</div>
          </div>
        </div>
      </body>
    </Providers>
  </html>
);

export default RootLayout;
