import { Metadata, NextPage } from 'next';

import { config } from '@odnlabs/utils';

import { LoginForm } from './LoginForm';

export const metadata: Metadata = {
  title: 'Login | Open Dev Net',
};

const Login: NextPage = () => (
  <div className="py-5 sm:py-10 md:py-20 min-h-screen bg-background-secondary">
    <LoginForm web={config.web} />
  </div>
);

export default Login;
