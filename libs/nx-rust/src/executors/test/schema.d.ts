import { BaseOptions } from '../../utils/build-command';

export interface TestExecutorSchema extends BaseOptions {
  'no-run'?: boolean;
  'no-fail-fast'?: boolean;
}
