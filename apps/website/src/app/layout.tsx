import { Poppins } from 'next/font/google';

import { ToastWrapper } from '@components/layout/index';
import { Metadata } from 'next';
import { Providers } from 'src/components/layout/Providers';

import { AccessibilityShortcuts } from '@components/layout/Header/AccessibilityShortcuts';
import '@odnlabs/ui/styles.css';
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

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <head>
      <link href="/favicon.ico" rel="icon" sizes="any" />
    </head>
    <Providers>
      <body className={font.className} tabIndex={-1}>
        <ToastWrapper />
        <AccessibilityShortcuts />
        {/* Main tag is added in child layouts */}
        {children}
      </body>
    </Providers>
  </html>
);

export default RootLayout;
