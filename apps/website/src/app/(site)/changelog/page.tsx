import { Metadata, NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Changelog | Open Dev Net',
};

const ChangeLog: NextPage = () => {
  interface ChangeLog {
    version: string;
    type: 'major' | 'minor' | 'patch';
    date: Date;
    changes: (string | JSX.Element)[];
  }

  const changeLogData: ChangeLog[] = [
    {
      version: '1.0.0',
      type: 'major',
      date: new Date('2023-10-01'),
      changes: [
        'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas alias ut dolor et doloribus perferendis labore cum aliquid?',
        'Lorem ipsum dolor sit amet.',
        // eslint-disable-next-line react/jsx-key
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
          <Link className="link" href="/changelog">
            Nulla euismod
          </Link>
          .
        </>,
      ],
    },
    {
      version: '0.1.5',
      type: 'minor',
      date: new Date('2023-10-01'),
      changes: [
        'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas alias ut dolor et doloribus perferendis labore cum aliquid?',
        'Lorem ipsum dolor sit amet.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod.',
      ],
    },
    {
      version: '0.0.1',
      type: 'patch',
      date: new Date('2023-10-01'),
      changes: [
        'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas alias ut dolor et doloribus perferendis labore cum aliquid?',
        'Lorem ipsum dolor sit amet.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod.',
      ],
    },
  ];

  const typeColor = {
    major: 'bg-purple-600',
    minor: 'bg-green-600',
    patch: 'bg-orange-600',
  };

  return (
    <div className="mx-auto w-11/12 max-w-3xl py-20">
      <h1 className="text-4xl font-bold">Changelog</h1>
      <div className="mt-10">
        {changeLogData.map((changeLog) => (
          <div className="border-border border-t py-10" key={changeLog.version}>
            <h2 className="text-3xl font-bold">
              <span className="">
                {changeLog.date
                  .toLocaleString('default', { month: 'long' })
                  .slice(0, 3)}{' '}
                {changeLog.date.getDate()} , {changeLog.date.getFullYear()}
              </span>
            </h2>
            <p
              className={`mt-5 inline-block rounded-md px-3 py-1 text-sm font-semibold text-white ${
                typeColor[changeLog.type]
              }`}
            >
              {changeLog.version}
              <span className="mx-1">•</span>
              <span className="capitalize">{changeLog.type}</span>
            </p>
            <ul className="mt-5 list-disc pl-5">
              {changeLog.changes.map((change, changeIndex) => (
                <li
                  className="mt-2 pl-2"
                  // eslint-disable-next-line react/no-array-index-key
                  key={changeIndex}
                >
                  {change}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangeLog;
