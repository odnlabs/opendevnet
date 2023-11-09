import { Metadata, NextPage } from 'next';

import { FeedbackForm } from './FeedbackForm';

export const metadata: Metadata = {
  title: 'Feedback | Open Dev Net',
};

const Feedback: NextPage = () => (
  <div className="pb-52 pt-20">
    <FeedbackForm />
  </div>
);

export default Feedback;
