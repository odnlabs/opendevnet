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
      image: '/home/innovate.svg',
      text: "Innovate, team up, solve today's problems",
    },
    {
      image: '/home/workflow.svg',
      text: 'Streamline your workflow and boost productivity',
    },
  ];

  return (
    <>
      <section>
        <div className="mx-auto w-10/12 max-w-7xl py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-text-secondary text-5xl font-bold">
              <span className="from-brand-gradient-1 to-brand-gradient-2 bg-gradient-to-r bg-clip-text text-transparent">
                Connecting Developers
              </span>
            </h1>
            <h1 className="mt-5 text-3xl font-bold md:text-5xl">
              <span>Across the World</span>
            </h1>
            <div className="mx-auto max-w-2xl">
              <p className="text-text-secondary my-8 text-sm sm:text-base">
                Welcome to Open Dev Net, where programmers from all corners of
                the globe collaborate, innovate, and code for a better future.
                Join us in connecting minds, creating solutions, and making a
                positive impact on the world.
              </p>
              <HomepageButtons />
            </div>
          </div>
        </div>
        <div className="bg-background-secondary border-border border-y py-10 text-center">
          <p className="text-text-primary text-xl font-medium">
            &quot;The social platform for creators, innovators, and
            developers.&quot;
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-7xl justify-center py-24">
          {features.map((feature, index) => (
            <div key={index} className="w-96 p-10 text-center">
              <Image
                src={feature.image}
                alt="illustration"
                height={200}
                width={200}
                className="mx-auto"
              />
              <p className="mt-10 block px-2 text-lg font-medium">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mx-auto w-11/12 max-w-3xl pb-32 pt-10">
          <h1 className="text-center text-3xl font-medium">
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
