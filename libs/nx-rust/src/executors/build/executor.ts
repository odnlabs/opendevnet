import { ExecutorContext } from '@nx/devkit';

import { buildCommand } from '../../utils/build-command';
import { cargoCommand } from '../../utils/cargo';
import { BuildExecutorSchema } from './schema';

/**
 * Run the executor.
 * @param options The options passed to the executor.
 * @param context The context of the executor.
 * @returns The return value of the executor.
 */
export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const command = buildCommand('build', options, context);

  const { success } = await cargoCommand(...command);

  return {
    success,
  };
}
