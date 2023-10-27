import { joinPathFragments, workspaceRoot } from '@nx/devkit';
import { ChildProcess, StdioOptions, execSync, spawn } from 'child_process';
import * as colors from 'colors';

import { CargoMetadata } from '../models/cargo-metadata';

interface CargoRun {
  success: boolean;
  output: string;
}

interface RunCargoOptions {
  stdio: StdioOptions;
  env: NodeJS.ProcessEnv | undefined;
}

export let childProcess: ChildProcess | null;

/**
 * Spawn a cargo command synchronously.
 * @param args The args to pass to the cargo command.
 * @param options The options to pass to the cargo command.
 * @returns The return value of the cargo command.
 */
export function cargoCommandSync(
  args: string,
  options?: Partial<RunCargoOptions>
): CargoRun {
  const normalizedOptions: RunCargoOptions = {
    stdio: options?.stdio ?? 'inherit',
    env: {
      ...process.env,
      ...options?.env,
    },
  };

  try {
    return {
      output: execSync(`cargo ${args}`, {
        encoding: 'utf8',
        windowsHide: true,
        stdio: normalizedOptions.stdio,
        env: normalizedOptions.env,
      }),
      success: true,
    };
  } catch (err) {
    return {
      output: err as string,
      success: false,
    };
  }
}

/**
 * Get the cargo metadata.
 * @returns The cargo metadata.
 */
export function cargoMetadata(): CargoMetadata | undefined {
  const output = cargoCommandSync('metadata --format-version=1', {
    stdio: 'pipe',
  });

  if (!output.success) {
    return undefined;
  }

  return JSON.parse(output.output) as CargoMetadata;
}

/**
 * Run a process with the given command and args.
 * @param processCmd The command to run.
 * @param args The args to pass to the command.
 * @returns The return value of the process.
 */
export function runProcess(
  processCmd: string,
  ...args: string[]
): { success: boolean } | PromiseLike<{ success: boolean }> {
  const metadata = cargoMetadata();
  const targetDir =
    metadata?.target_directory ??
    joinPathFragments(workspaceRoot, 'dist', 'cargo');

  return new Promise((resolve) => {
    if (process.env.VERCEL) {
      // Vercel doesnt have support for cargo atm, so auto success builds
      resolve({ success: true });
      return;
    }

    execSync(`${processCmd} ${args.join(' ')}`, {
      cwd: process.cwd(),
      env: {
        ...process.env,
        RUSTC_WRAPPER: '',
        CARGO_TARGET_DIR: targetDir,
        CARGO_BUILD_TARGET_DIR: targetDir,
      },
      windowsHide: true,
      stdio: ['inherit', 'inherit', 'inherit'],
    });
    resolve({ success: true });
  });
}

/**
 * Spawn a cargo command.
 * @param args The args to pass to the cargo command.
 * @returns The return value of the cargo command.
 */
export async function cargoCommand(
  ...args: string[]
): Promise<{ success: boolean }> {
  console.log(colors.dim(`> cargo ${args.join(' ')}`));
  args.push('--color', 'always');
  return runProcess('cargo', ...args);
}

/**
 * Spawn a cargo run command.
 * @param args The args to pass to the cargo command.
 * @returns The return value of the cargo command.
 */
export function cargoRunCommand(
  ...args: string[]
): Promise<{ success: boolean }> {
  console.log(colors.dim(`> cargo ${args.join(' ')}`));
  return new Promise((resolve, reject) => {
    childProcess = spawn('cargo', [...args, '--color', 'always'], {
      cwd: process.cwd(),
      windowsHide: true,
      detached: true,
      shell: false,
      stdio: ['inherit', 'inherit', 'inherit'],
    });

    // Ensure the child process is killed when the parent exits
    process.on('exit', () => childProcess?.kill());
    process.on('SIGTERM', () => childProcess?.kill());
    process.on('SIGINT', () => childProcess?.kill());

    childProcess.on('error', () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ success: false });
    });

    childProcess.on('exit', (code) => {
      childProcess = null;
      if (code === 0) {
        resolve({ success: true });
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ success: false });
      }
    });
  });
}
