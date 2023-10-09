import { Metadata, NextPage } from 'next';
import { RegisterBox } from './RegisterBox';

export const metadata: Metadata = {
  title: 'Register | Open Dev Net',
};

const Register: NextPage = () => (
  <div className="py-20 bg-background-secondary h-screen">
    <RegisterBox />
  </div>
);

export default Register;
