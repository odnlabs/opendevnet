import { Metadata } from 'next';
import { RegisterBox } from './RegisterBox';

export const metadata: Metadata = {
  title: 'Register | Open Dev Net',
};

export default function Register() {
  return (
    <div className="py-20 bg-background-secondary h-screen">
      <RegisterBox />
    </div>
  );
}
