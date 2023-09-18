import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const devList = [
  {
    name: 'Slekup',
    username: 'slekup',
    avatar: 'https://avatars.githubusercontent.com/u/74949101?v=4',
  },
  {
    name: 'Brian Kungu ',
    username: 'brianKungu',
    avatar: 'https://avatars.githubusercontent.com/u/49023180?v=4',
  },
  {
    name: 'Abdullah Alharbi',
    username: 'A-alharbi9 ',
    avatar: 'https://avatars.githubusercontent.com/u/82731458?v=4',
  },
];

export const metadata: Metadata = {
  title: 'Developers | Open Dev Net',
};

export default function Developers({}) {
  return (
    <div className="mx-auto my-8 w-11/12 max-w-3xl sm:my-10 md:my-20">
      <h1 className="text-center text-3xl font-semibold">Developers</h1>
      <div className="mt-5 flex flex-wrap justify-center">
        {devList.map((dev, index) => (
          <a
            href={`https://github.com/${dev.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-5 sm:w-1/2 md:w-1/3"
            key={index}
          >
            <div className="rounded-2xl border border-border p-5 transition hover:bg-secondary active:bg-secondary-active">
              <Image
                src={dev.avatar}
                alt={dev.name}
                width={100}
                height={100}
                className="mx-auto rounded-full"
              />
              <h1 className="mt-5 text-center font-medium">{dev.name}</h1>
            </div>
          </a>
        ))}
      </div>
      <p className="mt-5 text-center text-gray-400">
        Want to join? DM @<b>slekup</b> on discord.
      </p>
    </div>
  );
}
