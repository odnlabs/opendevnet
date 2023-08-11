import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  return <>{children}</>;
}
