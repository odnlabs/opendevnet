import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Changelog | Open Dev Net',
};

export default function ChangeLog() {
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
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
          <Link href="/changelog" className="link">
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
    <div className="py-20 max-w-3xl w-11/12 mx-auto">
      <h1 className="text-4xl font-bold">Changelog</h1>
      <div className="mt-10">
        {changeLogData.map((changeLog) => (
          <div className="py-10 border-t border-border">
            <h2 className="text-3xl font-bold">
              <span className="">
                {changeLog.date
                  .toLocaleString('default', { month: 'long' })
                  .slice(0, 3)}{' '}
                {changeLog.date.getDate()} , {changeLog.date.getFullYear()}
              </span>
            </h2>
            <p
              className={`inline-block mt-5 py-1 px-3 rounded-md text-white font-semibold text-sm ${
                typeColor[changeLog.type]
              }`}
            >
              {changeLog.version}
              <span className="mx-1">•</span>
              <span className="capitalize">{changeLog.type}</span>
            </p>
            <ul className="mt-5 list-disc pl-5">
              {changeLog.changes.map((change) => (
                <li className="mt-2 pl-2">{change}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
