import { BaseOptions } from '../../utils/formatOptions';

export interface TestExecutorSchema extends BaseOptions {
  'no-run'?: boolean;
  'no-fail-fast'?: boolean;
}
