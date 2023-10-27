import { ExecutorContext } from '@nx/devkit';

export interface BaseOptions {
  'toolchain'?: 'stable' | 'beta' | 'nightly';
  'target'?: string;
  'profile'?: string;
  'release'?: boolean;
  'target-dir'?: string;
  'features'?: string | string[];
  'all-features'?: boolean;
}

/**
 * Build a command to run cargo.
 * @param baseCommand The base command to run.
 * @param options The options passed to the executor.
 * @param context The context of the executor.
 * @returns The command to run.
 */
export const buildCommand = (
  baseCommand: string,
  options: BaseOptions,
  context: ExecutorContext
): string[] => {
  const args: string[] = [];

  if (options.toolchain && options.toolchain !== 'stable') {
    args.push(`+${options.toolchain}`);
  }

  args.push(baseCommand);

  for (const [key, value] of Object.entries(options)) {
    if (key === 'toolchain') {
      continue;
    }

    if (typeof value === 'boolean') {
      // false flags should not be added to the cargo args
      if (value) {
        args.push(`--${key}`);
      }
    } else if (Array.isArray(value)) {
      for (const item of value) {
        args.push(`--${key}`, item as string);
      }
    } else if (typeof value === 'string') {
      args.push(`--${key}`, value);
    }
  }

  if (['build', 'lint', 'run', 'test'].includes(baseCommand))
    args.push('-p', context.projectName);

  return args;
};
