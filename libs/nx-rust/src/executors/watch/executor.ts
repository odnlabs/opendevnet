import { WatchExecutorSchema } from './schema';

export default async function runExecutor(options: WatchExecutorSchema) {
  console.log('Executor ran for Watch', options);
  return {
    success: true,
  };
}
