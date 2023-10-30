import axios from 'axios';
import { Base, BaseOptions } from './builders/Base';

import { Auth } from './auth';
import { Users } from './users';

export * from './typings';

interface ClientOptions extends Omit<BaseOptions, 'instance'> {}

/**
 * The main client class, used to interact with the API.
 */
export class Client extends Base {
  public auth: Auth;
  public users: Users;

  /**
   * Creates a new client instance.
   * @param options The options for the client.
   */
  public constructor(options: ClientOptions) {
    const instance = axios.create({
      withCredentials: true,
      baseURL: options.baseApiUrl,
    });

    super({
      instance,
      accessToken: options.accessToken,
      refreshToken: options.refreshToken,
      baseApiUrl: options.baseApiUrl,
      baseWebUrl: options.baseWebUrl,
    });

    this.auth = new Auth({
      instance,
      accessToken: this.accessToken,
      refreshToken: options.refreshToken,
      baseApiUrl: this.baseApiUrl,
      baseWebUrl: this.baseWebUrl,
    });

    this.users = new Users({
      instance,
      accessToken: this.accessToken,
      refreshToken: options.refreshToken,
      baseApiUrl: this.baseApiUrl,
      baseWebUrl: this.baseWebUrl,
    });
  }

  /**
   * Gets the user profile for the current user.
   */
  public async logout(): Promise<void> {
    await this.instance.delete('/auth/logout');
  }
}
