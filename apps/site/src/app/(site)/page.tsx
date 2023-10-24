import { Metadata, NextPage } from 'next';
import Image from 'next/image';

import { Accordian } from '@components';
import { HomepageButtons } from './components';

export const metadata: Metadata = {
  title: 'Home | Open Dev Net',
};

const Home: NextPage = () => {
  const faq = [
    {
      question: 'How can I get started on Open Dev Net?',
      answer:
        "To get started, simply sign up for an account on our platform. Once you're registered, you can explore discussions, join projects, and interact with other developers. Feel free to introduce yourself in our community forums.",
    },
    {
      question: 'Is Open Dev Net open to developers of all skill levels?',
      answer:
        'Absolutely! Open Dev Net welcomes developers of all skill levels, from beginners to experts. Our goal is to create a diverse and inclusive community where everyone can learn and collaborate.',
    },
    {
      question: 'Are there guidelines for behavior on Open Dev Net?',
      answer:
        'Yes, we have community guidelines in place to ensure a respectful and productive environment. Please read and follow these guidelines to maintain a positive atmosphere. You can find them in our "Community Guidelines" section.',
    },
    {
      question: 'Can I promote my own projects or work on Open Dev Net?',
      answer:
        'Yes, self-promotion is allowed within reasonable limits. We encourage you to share your work and achievements, but please do so thoughtfully and avoid excessive self-promotion or spamming.',
    },
    {
      question: 'How can I report inappropriate behavior or content?',
      answer:
        'If you encounter harassment, hate speech, or any guideline violations, please report them to our moderators. Click the "Report" button on the content in question, and our moderators will address it promptly.',
    },
    {
      question:
        'Can I collaborate with other developers on projects within the community?',
      answer:
        'Absolutely! Open Dev Net is all about collaboration. You can join existing projects, start your own, or participate in discussions to collaborate with fellow developers.',
    },
    {
      question: 'Is Open Dev Net a paid platform?',
      answer:
        'Open Dev Net is free to use for all developers. There are no subscription fees or hidden charges. Our goal is to provide an open and accessible space for the developer community.',
    },
    {
      question: 'How can I contribute to the Open Dev Net community?',
      answer:
        'You can contribute by actively participating in discussions, sharing your knowledge, helping others, and collaborating on projects. Your contributions, no matter how big or small, are valuable to the community.',
    },
    {
      question:
        'How can I contact support or ask questions about using the platform?',
      answer:
        'If you have questions or need assistance, you can reach out to our support team through the "Contact Us" link on our platform. We\'re here to help with any inquiries or issues you may have.',
    },
  ];

  const features = [
    {
      image: '/home/network.svg',
      text: 'Connect with developers from around the world',
    },
    {
      image: '/home/innovation.svg',
      text: 'Collaborate on projects and share ideas',
    },
    {
      image: '/home/workflow.svg',
      text: 'Streamline your workflow and boost productivity',
    },
  ];

  return (
    <>
      <section>
        <div className="max-w-7xl w-10/12 mx-auto py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-text-secondary">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-gradient-1 to-brand-gradient-2">
                Connecting Developers
              </span>
            </h1>
            <h1 className="mt-5 text-3xl md:text-5xl font-bold">
              <span>Across the World</span>
            </h1>
            <div className="max-w-2xl mx-auto">
              <p className="text-sm sm:text-base text-text-secondary my-8">
                Welcome to Open Dev Net, where programmers from all corners of
                the globe collaborate, innovate, and code for a better future.
                Join us in connecting minds, creating solutions, and making a
                positive impact on the world.
              </p>
              <HomepageButtons />
            </div>
          </div>
        </div>
        <div className="py-10 bg-background-secondary text-center">
          <p className="font-medium text-text-secondary text-xl">
            &quot;The social platform for creators, innovators, and
            developers.&quot;
          </p>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto flex justify-center py-24">
          {features.map((feature, index) => (
            <div key={index} className="p-10 w-96 text-center">
              <Image
                src={feature.image}
                alt="illustration"
                height={200}
                width={200}
                className="mx-auto"
              />
              <p className="block mt-10 font-medium text-lg px-2">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="max-w-3xl w-11/12 mx-auto pt-10 pb-32">
          <h1 className="font-medium text-3xl text-center">
            Frequently Asked Questions
          </h1>
          <div className="mt-10">
            <Accordian data={faq} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
