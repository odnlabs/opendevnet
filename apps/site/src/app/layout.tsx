import '@odnlabs/ui/styles.css';
import { Poppins } from 'next/font/google';

import { Header, ToastWrapper } from '@components/layout';
import { Metadata } from 'next';
import { Footer } from 'src/components/layout/Footer';
import { Providers } from 'src/components/layout/Providers';
import '../styles/globals.css';

const font = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
  title: 'Open Dev Net',
  description:
    'The open-source social platform for developers to collaborate, find opportunities, and streamline workflows.',
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

          <div className="relative h-14"></div>
          <Header />

          <div className="min-h-[80vh]">{children}</div>

          <Footer />
        </body>
      </Providers>
    </html>
  );
}
