'use client';

import { Provider as ReduxProvider } from 'react-redux';

import { store } from 'src/store';

interface Props {
  children: React.ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => (
  <>
    <ReduxProvider store={store}>{children}</ReduxProvider>
  </>
);
