import { Schema } from 'builder-validation';
import { Base } from './builders/Base';

interface RegisterParams {
  email: string;
  username: string;
  password: string;
}

interface RegisterResponse {
  status: 'success' | 'error';
}

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

/**
 * The Auth class, used to interact with the Auth API.
 * See the methods for examples of usage.
 */
export class Auth extends Base {
  /**
   * Sets the access token for the current user.
   * @param value The access token to set.
   */
  public setAccessToken(value: string | undefined): void {
    this.accessToken = value;
  }

  /**
   * Sets the refresh token for the current user.
   * @param value The refresh token to set.
   */
  public setRefreshToken(value: string | undefined): void {
    this.refreshToken = value;
  }

  /**
   * Registers a new user.
   * @param params The parameters to register the user with.
   * @returns The response from the API.
   * # Usage
   * ```typescript
   * const client = new Client();
   * client.auth.login({
   * email: 'test_user@opendevnet.com',
   * password: '12341324',
   * })
   * ```
   */
  public async register(params: RegisterParams): Promise<RegisterResponse> {
    // Basic frontend validation
    // NOTE this is not a replacement for backend validation.
    const schema = new Schema()
      .addString({
        name: 'email',
        required: true,
        test: 'email',
      })
      .addString({
        name: 'password',
        required: true,
        test: 'passwordStrength',
      });

    const result = await schema.validate({ ...params });

    if (typeof result === 'string') {
      throw new Error(result);
    }

    try {
      const response = await this.instance.post('/auth/register', params);
      return response.data as RegisterResponse;
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  /**
   * Logs the user in. Returns both the access and refresh JSON Web Tokens.
   * @param params The parameters to login the user with.
   * @returns The response from the API.
   */
  public async login(params: LoginParams): Promise<LoginResponse> {
    // Basic frontend validation
    // NOTE this is not a replacement for backend validation.
    const schema = new Schema()
      .addString({
        name: 'email',
        required: true,
        test: 'email',
      })
      .addString({
        name: 'password',
        required: true,
      });

    const result = await schema.validate({ ...params });

    if (typeof result === 'string') {
      throw new Error(result);
    }

    try {
      const result = await this.instance.post('/auth/login', params);
      const { accessToken, refreshToken } = result.data as LoginResponse;
      this.setAccessToken(accessToken);
      this.setRefreshToken(refreshToken);
      return result.data as LoginResponse;
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  /**
   * Logs the user out.
   * @returns The response from the API.
   */
  public async logout(): Promise<void> {
    try {
      await this.instance.post('/auth/logout');
      this.setAccessToken(undefined);
      this.setRefreshToken(undefined);
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  /**
   * Refreshes the access token.
   * @returns The response from the API.
   */
  public async refresh(): Promise<void> {
    try {
      const result = await this.instance.get('/auth/refresh');
      const { accessToken } = result.data as LoginResponse;
      this.setAccessToken(accessToken);
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }
}
