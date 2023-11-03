import { Metadata, NextPage } from 'next';
import { RegisterForm } from './RegisterForm';

export const metadata: Metadata = {
  title: 'Register | Open Dev Net',
};

const Register: NextPage = () => (
  <div className="bg-background-secondary min-h-screen py-5 sm:py-10 md:py-20">
    <RegisterForm />
  </div>
);

export default Register;
