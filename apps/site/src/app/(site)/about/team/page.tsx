import { Metadata, NextPage } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Developers | Open Dev Net',
};

const Team: NextPage = () => {
  const devList = [
    {
      name: 'Slekup',
      username: 'slekup',
      avatar: 'https://avatars.githubusercontent.com/u/74949101?v=4',
      title: 'Founder & Lead Developer',
    },
    {
      name: 'Abdullah Alharbi',
      username: 'A-alharbi9 ',
      avatar: 'https://avatars.githubusercontent.com/u/82731458?v=4',
      title: 'Fullstack Developer',
    },
    {
      name: 'Brian Kungu ',
      username: 'brianKungu',
      avatar: 'https://avatars.githubusercontent.com/u/49023180?v=4',
      title: 'Frontend Developer',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl py-5 sm:py-8 md:py-10">
      <h1 className="text-center text-3xl font-semibold">Developers</h1>
      <p className="text-text-secondary mx-auto mt-5 max-w-xl text-center text-sm">
        Open Dev Net thrives on community collaboration, and we welcome
        contributions from developers worldwide. On this page, we proudly
        showcase our esteemed team members whose expertise and dedication drive
        our mission forward.
      </p>
      <div className="mt-8 flex flex-wrap justify-center">
        {devList.map((dev, index) => (
          <a
            href={`https://github.com/${dev.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-3 md:w-1/2 lg:w-1/3"
            key={index}
          >
            <div className="border-border hover:bg-secondary active:bg-secondary-active rounded-2xl border p-8 transition">
              <Image
                src={dev.avatar}
                alt={dev.name}
                width={100}
                height={100}
                className="mx-auto rounded-full"
              />
              <p className="mt-5 text-center text-lg font-medium">{dev.name}</p>
              <h1 className="text-text-secondary mb-2 mt-2 text-center text-sm">
                {dev.title}
              </h1>
            </div>
          </a>
        ))}
      </div>
      <p className="mt-10 text-center text-gray-400">
        Want to join the team?{' '}
        <a
          href="mailto:slekupvimplyrataqq@protonmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Send an email
        </a>
        .
      </p>
    </div>
  );
};

export default Team;
