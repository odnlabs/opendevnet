import { Metadata, NextPage } from 'next';
import { RegisterForm } from './RegisterForm';

export const metadata: Metadata = {
  title: 'Register | Open Dev Net',
};

const Register: NextPage = () => (
  <div className="py-20 bg-background-secondary h-screen">
    <RegisterForm />
  </div>
);

export default Register;
