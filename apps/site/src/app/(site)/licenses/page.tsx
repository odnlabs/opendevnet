import fs from 'fs/promises';
import { Metadata, NextPage } from 'next';
import toml from 'toml';

import { config } from '@odnlabs/utils';

export const metadata: Metadata = {
  title: 'Licenses | Open Dev Net',
};

const Licenses: NextPage = async () => {
  const paths: Record<'js' | 'rust', string[]> = {
    js: [
      '../../package.json',
      './package.json',
      '../web/package.json',
      '../../libs/api-client/package.json',
      '../../libs/eslint-config-odn/package.json',
      '../../libs/tailwind-config/package.json',
      '../../libs/tsconfig/package.json',
      '../../libs/ui/package.json',
    ],
    rust: ['../api/Cargo.toml'],
  };

  type LicenseList = Record<'js' | 'rust' | 'internal', string[][]>;

  const licenses: LicenseList = {
    js: [],
    rust: [],
    internal: [],
  };

  const findInternalLibDirName = async (
    name: string
  ): Promise<string | undefined> => {
    const directories = (
      await fs.readdir('../../libs', {
        withFileTypes: true,
      })
    )
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const dir of directories) {
      const packageJson = JSON.parse(
        await fs.readFile(`../../libs/${dir}/package.json`, 'utf8')
      ) as { name: string };
      if (packageJson.name === name) return dir;
      else continue;
    }

    return undefined;
  };

  const addNpmPackage = async (
    packages: Record<string, string>
  ): Promise<void> => {
    for (const [key, value] of Object.entries(packages)) {
      if (['workspace:*', '*'].includes(value)) {
        const dirName = await findInternalLibDirName(key);
        if (typeof dirName === 'string')
          licenses.internal.push([
            key,
            `${config.social.github}/opendevnet/tree/main/libs/${dirName}`,
          ]);
      } else {
        licenses.js.push([key, `https://www.npmjs.com/package/${key}`]);
      }
    }
  };

  for (const path of paths.js) {
    const file = JSON.parse(await fs.readFile(path, 'utf8')) as {
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    };
    if (file.dependencies) await addNpmPackage(file.dependencies);
    if (file.devDependencies) await addNpmPackage(file.devDependencies);
  }

  for (const path of paths.rust) {
    const file = await fs.readFile(path, 'utf8');
    const parsed = toml.parse(file) as {
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    };
    if (parsed.dependencies)
      licenses.rust.push(
        ...Object.keys(parsed.dependencies).map((key) => [
          key,
          `https://crates.io/crates/${key}`,
        ])
      );
    if (parsed.devDependencies)
      licenses.rust.push(
        ...Object.keys(parsed.devDependencies).map((key) => [
          key,
          `https://crates.io/crates/${key}`,
        ])
      );
  }

  const filterAndSort = (originalArr: string[][]): string[][] =>
    originalArr
      .filter(
        (item, index, arr) =>
          arr.findIndex((subItem) => subItem[0] === item[0]) === index
      )
      .sort();

  const filteredLicenses: LicenseList = {
    js: filterAndSort(licenses.js),
    rust: filterAndSort(licenses.rust),
    internal: filterAndSort(licenses.internal),
  };

  return (
    <>
      <div className="mx-auto mb-20 mt-10 w-10/12 max-w-xl lg:mb-28 lg:mt-20">
        <h1 className="text-4xl font-bold">Licenses</h1>
        <p className="mt-4">
          All software and documentation in the Open Dev Net is released under
          one of the following licenses:
        </p>
        <p className="mt-4 font-medium">Rust Crates:</p>
        <ul className="mt-1 list-inside list-disc">
          {filteredLicenses.rust.map((license, index) => (
            <li key={index} className="text-text-secondary">
              <a
                href={license[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="link mx-1"
              >
                {license[0]}
              </a>
              {licenses.rust.filter((item) => item[0] === license[0]).length >
                1 && (
                <span className="text-text-faint text-xs">
                  x
                  {
                    licenses.rust.filter((item) => item[0] === license[0])
                      .length
                  }
                </span>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-4 font-medium">Internal Libraries:</p>
        <ul className="mt-1 list-inside list-disc">
          {filteredLicenses.internal.map((license, index) => (
            <li key={index} className="text-text-secondary">
              <a
                href={license[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="link mx-1"
              >
                {license[0]}
              </a>
              {licenses.internal.filter((item) => item[0] === license[0])
                .length > 1 && (
                <span className="text-text-faint text-xs">
                  x
                  {
                    licenses.internal.filter((item) => item[0] === license[0])
                      .length
                  }
                </span>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-4 font-medium">NPM Packages:</p>
        <ul className="mt-1 list-inside list-disc">
          {filteredLicenses.js.map((license, index) => (
            <li key={index} className="text-text-secondary">
              <a
                href={license[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="link mx-1"
              >
                {license[0]}
              </a>
              {licenses.js.filter((item) => item[0] === license[0]).length >
                1 && (
                <span className="text-text-faint text-xs">
                  x{licenses.js.filter((item) => item[0] === license[0]).length}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Licenses;
