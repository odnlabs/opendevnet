import { Metadata, NextPage } from 'next';

import { LoginBox } from './LoginBox';

export const metadata: Metadata = {
  title: 'Login | Open Dev Net',
};

const Login: NextPage = () => (
  <div className="py-20 h-screen bg-background-secondary">
    <LoginBox />
  </div>
);

export default Login;
