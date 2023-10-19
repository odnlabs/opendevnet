import fs from 'fs/promises';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Licenses | Open Dev Net',
};

const Licenses: NextPage = async () => {
  const paths = [
    '../../package.json',
    './package.json',
    '../web/package.json',
    '../../packages/api-client/package.json',
    '../../packages/eslint-config-odn/package.json',
    '../../packages/tailwind-config/package.json',
    '../../packages/tsconfig/package.json',
    '../../packages/ui/package.json',
  ];

  const licenses = [];

  for (const path of paths) {
    const file = JSON.parse(await fs.readFile(path, 'utf8')) as {
      dependencies: string[];
      devDependencies: string[];
    };
    if (file.dependencies) licenses.push(...Object.keys(file.dependencies));
    if (file.devDependencies)
      licenses.push(...Object.keys(file.devDependencies));
  }

  const filteredLicenses = licenses
    .filter((item, pos, self) => self.indexOf(item) === pos)
    .sort();

  return (
    <>
      <div className="max-w-3xl w-10/12 mx-auto mt-10 lg:mt-20 mb-20 lg:mb-28">
        <h1 className="text-4xl font-bold">Licenses</h1>
        <p className="mt-4">
          All software and documentation in the Open Dev Net is released under
          one of the following licenses:
        </p>
        <ul className="mt-4 list-disc list-inside">
          {filteredLicenses.map((license, index) => (
            <li key={index}>
              <a
                href={`https://www.npmjs.com/package/${license}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                {license}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Licenses;
