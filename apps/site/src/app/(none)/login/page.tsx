import { Metadata } from 'next';

import { LoginBox } from './LoginBox';

export const metadata: Metadata = {
  title: 'Login | Open Dev Net',
};

export default function Login() {
  return (
    <div className="py-20 h-screen bg-background-secondary">
      <LoginBox />
    </div>
  );
}
