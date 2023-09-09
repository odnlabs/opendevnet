import axios from 'axios';
import { Base, BaseOptions } from './builders/Base';

export * from './typings';

interface ClientOptions extends Omit<BaseOptions, 'instance'> {}

/**
 * The main client class, used to interact with the API.
 */
export class Client extends Base {
  // public user: User;

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
      tokenKey: options.tokenKey,
      baseApiUrl: options.baseApiUrl,
      baseWebUrl: options.baseWebUrl,
    });

    // this.user = new User({
    //   instance,
    //   tokenKey: this.tokenKey,
    //   baseApiUrl: this.baseApiUrl,
    //   baseWebUrl: this.baseWebUrl,
    // });
  }

  /**
   * Gets the user profile for the current user.
   */
  public async logout(): Promise<void> {
    await this.instance.delete('/auth/logout');
  }
}
