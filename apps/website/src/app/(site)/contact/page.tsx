import { Metadata, NextPage } from 'next';

import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Open Dev Net',
};

const Contact: NextPage = () => (
  <div className="pb-52 pt-20">
    <ContactForm />
  </div>
);

export default Contact;
