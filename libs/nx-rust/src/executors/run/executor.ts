import { ExecutorContext } from '@nx/devkit';
import { buildCommand } from '../../utils/build-command';
import { cargoRunCommand } from '../../utils/cargo';
import { RunExecutorSchema } from './schema';

/**
 * Run the executor.
 * @param options The options passed to the executor.
 * @param context The context of the executor.
 * @returns The return value of the executor.
 */
export default async function runExecutor(
  options: RunExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const command = buildCommand('run', options, context);

  const { success } = await cargoRunCommand(...command);

  return {
    success,
  };
}
