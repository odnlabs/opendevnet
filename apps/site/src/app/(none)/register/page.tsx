import { Metadata, NextPage } from 'next';
import { RegisterForm } from './RegisterForm';

export const metadata: Metadata = {
  title: 'Register | Open Dev Net',
};

const Register: NextPage = () => (
  <div className="py-5 sm:py-10 md:py-20 min-h-screen bg-background-secondary">
    <RegisterForm />
  </div>
);

export default Register;
