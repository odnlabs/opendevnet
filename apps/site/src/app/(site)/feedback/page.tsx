import { Metadata, NextPage } from 'next';

import { FeedbackForm } from './FeedbackForm';

export const metadata: Metadata = {
  title: 'Feedback | Open Dev Net',
};

const Feedback: NextPage = () => (
  <div className="pt-20 pb-40 bg-background-secondary">
    <FeedbackForm />
  </div>
);

export default Feedback;
