import { Metadata, NextPage } from 'next';

import { config } from '@odnlabs/utils-server';

import { LoginForm } from './LoginForm';

export const metadata: Metadata = {
  title: 'Login | Open Dev Net',
};

const Login: NextPage = () => (
  <div className="bg-background-secondary min-h-screen py-5 sm:py-10 md:py-20">
    <LoginForm webClient={config.webClient} />
  </div>
);

export default Login;
