import fs from 'fs/promises';
import { Metadata, NextPage } from 'next';
import toml from 'toml';

import { config } from '@odnlabs/utils-server';

export const metadata: Metadata = {
  title: 'Licenses | Open Dev Net',
};

// For both package.json and parsed Cargo.toml
interface DepFile {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

interface CargoLockPackage {
  name: string;
  version: string;
  source: string;
  checksum: string;
  dependencies: string[];
}

interface CargoLock {
  package: Record<string, CargoLockPackage>;
}

type LibraryList = Record<'js' | 'rust' | 'internal', string[][]>;

/**
 * Gets a list of all the libraries used by Open Dev Net.
 * @returns The list of libraries.
 */
const getLibraries = async (): Promise<LibraryList> => {
  const libraries: LibraryList = {
    js: [],
    rust: [],
    internal: [],
  };

  /**
   * Find the name of the internal library defined in package.json.
   * @param name The name of the directory.
   * @returns The name of the internal library.
   */
  const findInternalLibDirName = async (
    name: string
  ): Promise<string | undefined> => {
    const libs = await fs.readdir('../../libs', { withFileTypes: true });
    const directories = libs
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const dir of directories) {
      const packageJsonPath = `../../libs/${dir}/package.json`;
      const packageJsonFile = await fs.readFile(packageJsonPath, 'utf8');
      const packageJson = JSON.parse(packageJsonFile) as { name: string };
      if (packageJson.name === name) return dir;
      else continue;
    }

    return undefined;
  };

  /**
   * Adds an npm package to the libraries list with a link to its npm page or github link if it is an internal library.
   * @param packages The packages to add.
   * @returns Nothing.
   */
  const addNpmPackage = async (
    packages: Record<string, string>
  ): Promise<void> => {
    for (const [key, value] of Object.entries(packages)) {
      if (['workspace:*', '*'].includes(value)) {
        const dirName = await findInternalLibDirName(key);
        if (typeof dirName === 'string') {
          const link = `${config.social.github}/opendevnet/tree/main/libs/${dirName}`;
          libraries.internal.push([key, link]);
        }
      } else {
        libraries.js.push([key, `https://www.npmjs.com/package/${key}`]);
      }
    }
  };

  /**
   * Adds a crate to the libraries list with a link to its crates.io page.
   * @param crates The crates to add.
   */
  const addCrate = (crates: Record<string, string>): void => {
    libraries.rust.push(
      ...Object.keys(crates).map((key) => [
        key,
        `https://crates.io/crates/${key}`,
      ])
    );
  };

  const dirs: string[] = [];
  for (const dir of ['apps', 'libs', 'node_modules']) {
    dirs.push(
      ...(await fs.readdir(`../../${dir}`)).map(
        (dirx) => `../../${dir}/${dirx}`
      )
    );
  }

  // Loop through each of the dep files and add the libraries to the list.
  for (const dir of [...dirs, '../../']) {
    // package.json
    const packageJsonFile = await fs
      .readFile(`${dir}/package.json`, 'utf8')
      .catch(() => undefined);
    if (packageJsonFile) {
      const packageJson = JSON.parse(packageJsonFile) as DepFile | undefined;
      if (packageJson?.dependencies) {
        await addNpmPackage(packageJson.dependencies);
      }
      if (packageJson?.devDependencies) {
        await addNpmPackage(packageJson.devDependencies);
      }
    }
    // Cargo.toml
    const cargoTomlFile = await fs
      .readFile(`${dir}/Cargo.toml`, 'utf8')
      .catch(() => undefined);
    if (cargoTomlFile) {
      const cargoToml = toml.parse(cargoTomlFile) as DepFile | undefined;
      if (cargoToml?.dependencies) addCrate(cargoToml.dependencies);
      if (cargoToml?.devDependencies) addCrate(cargoToml.devDependencies);
    }
    // Cargo.lock
    const cargoLockFile = await fs
      .readFile(`${dir}/Cargo.lock`, 'utf8')
      .catch(() => undefined);
    if (cargoLockFile) {
      const cargoLock = toml.parse(cargoLockFile) as CargoLock | undefined;
      if (cargoLock?.package) {
        libraries.rust.push(
          ...Object.values(cargoLock.package).map((pkg) => [
            pkg.name,
            `https://crates.io/crates/${pkg.name}`,
          ])
        );
      }
    }
  }

  return libraries;
};

const Licenses: NextPage = async () => {
  const libraries = await getLibraries();

  const filterAndSort = (originalArr: string[][]): string[][] => {
    return originalArr
      .filter((item, index, arr) => {
        return arr.findIndex((subItem) => subItem[0] === item[0]) === index;
      })
      .sort();
  };

  const filteredLibraries: LibraryList = {
    js: filterAndSort(libraries.js),
    rust: filterAndSort(libraries.rust),
    internal: filterAndSort(libraries.internal),
  };

  return (
    <div className="mx-auto mb-20 mt-10 w-10/12 max-w-xl lg:mb-28 lg:mt-20">
      <h1 className="text-4xl font-bold">Licenses</h1>
      <p className="mt-4">
        Below is a list of all of the libraries and packages used by Open Dev
        Net, with links to their pages where you can find their licenses:
      </p>
      <p className="mt-4 font-medium">Rust Crates:</p>
      <ul className="mt-1 list-inside list-disc">
        {filteredLibraries.rust.map((library) => (
          <li className="text-text-secondary" key={library[0]}>
            <a
              className="link mx-1"
              href={library[1]}
              rel="noopener noreferrer"
              target="_blank"
            >
              {library[0]}
            </a>
            {libraries.rust.filter((item) => item[0] === library[0]).length >
              1 && (
              <span className="text-text-faint text-xs">
                x
                {libraries.rust.filter((item) => item[0] === library[0]).length}
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-4 font-medium">Internal Libraries:</p>
      <ul className="mt-1 list-inside list-disc">
        {filteredLibraries.internal.map((library) => (
          <li className="text-text-secondary" key={library[0]}>
            <a
              className="link mx-1"
              href={library[1]}
              rel="noopener noreferrer"
              target="_blank"
            >
              {library[0]}
            </a>
            {libraries.internal.filter((item) => item[0] === library[0])
              .length > 1 && (
              <span className="text-text-faint text-xs">
                x
                {
                  libraries.internal.filter((item) => item[0] === library[0])
                    .length
                }
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-4 font-medium">NPM Packages:</p>
      <ul className="mt-1 list-inside list-disc">
        {filteredLibraries.js.map((library) => (
          <li className="text-text-secondary" key={library[0]}>
            <a
              className="link mx-1"
              href={library[1]}
              rel="noopener noreferrer"
              target="_blank"
            >
              {library[0]}
            </a>
            {libraries.js.filter((item) => item[0] === library[0]).length >
              1 && (
              <span className="text-text-faint text-xs">
                x{libraries.js.filter((item) => item[0] === library[0]).length}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Licenses;
