import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

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

export const metadata: Metadata = {
  title: 'Developers | Open Dev Net',
};

export default function Developers({}) {
  return (
    <div className="mx-auto py-5 max-w-5xl sm:py-8 md:py-10">
      <h1 className="text-center text-3xl font-semibold">Developers</h1>
      <p className="max-w-xl mx-auto text-sm text-text-secondary mt-5 text-center">
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
            <div className="rounded-2xl border border-border p-8 transition hover:bg-secondary active:bg-secondary-active">
              <Image
                src={dev.avatar}
                alt={dev.name}
                width={100}
                height={100}
                className="mx-auto rounded-full"
              />
              <p className="mt-5 text-lg text-center font-medium">{dev.name}</p>
              <h1 className="mt-2 text-sm mb-2 text-center text-text-secondary">
                {dev.title}
              </h1>
            </div>
          </a>
        ))}
      </div>
      <p className="mt-10 text-center text-gray-400">
        Want to join? DM @<b>slekup</b> on discord.
      </p>
    </div>
  );
}
