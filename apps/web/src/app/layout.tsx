import '@odnlabs/ui/styles.css';
import { Roboto } from 'next/font/google';

import {
  Header,
  NavigationBar,
  Sidebar,
  ToastWrapper,
} from '@components/layout';
import { Providers } from 'src/components/layout/Providers';
import '../styles/globals.css';

const font = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin', 'latin-ext'],
});

export const metadata = {
  title: 'Open Dev Net',
  description:
    'The open-source social platform for developers to collaborate, find opportunities, and streamline workflows. ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <Providers>
        <body className={font.className}>
          <ToastWrapper />

          <div className="relative h-10"></div>
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
}
