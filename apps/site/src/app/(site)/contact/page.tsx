import { Metadata, NextPage } from 'next';

import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Open Dev Net',
};

const Contact: NextPage = () => (
  <div className="pt-20 pb-52">
    <ContactForm />
  </div>
);

export default Contact;
