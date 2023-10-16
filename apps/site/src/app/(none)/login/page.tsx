import { Metadata, NextPage } from 'next';

import { LoginForm } from './LoginForm';

export const metadata: Metadata = {
  title: 'Login | Open Dev Net',
};

const Login: NextPage = () => (
  <div className="py-20 h-screen bg-background-secondary">
    <LoginForm />
  </div>
);

export default Login;
