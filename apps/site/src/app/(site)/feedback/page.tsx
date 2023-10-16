import { NextPage } from 'next';

import { FeedbackForm } from './FeedbackForm';

const Feedback: NextPage = () => (
  <div className="pt-20 pb-40 bg-background-secondary">
    <FeedbackForm />
  </div>
);

export default Feedback;
