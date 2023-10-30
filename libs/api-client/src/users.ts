import { Base, BaseOptions } from './builders/Base';
import { IUser, Response } from './typings';

interface GetMeResponse extends Response {
  data: { user: IUser };
}

interface ListUsersResponse extends Response {
  data: { users: IUser[] };
}

/**
 * The Me class, used to access the current user's information.
 * See the methods for examples of usage.
 */
export class Me extends Base {
  /**
   * The constructor for the Me class.
   * @param parent The parent class, used to build the path to the endpoint.
   */
  public constructor(parent: BaseOptions) {
    super(parent);
  }

  /**
   * Get the current user's information.
   * @returns The current user's information.
   */
  public async get(): Promise<IUser> {
    try {
      const response = await this.instance.get('/users/me');
      return (response.data as GetMeResponse).data.user;
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }
}

/**
 * The Users class, used to access the users endpoints.
 */
export class Users extends Base {
  public me: Me;

  /**
   * The constructor for the Users class.
   * @param parent The parent class, used to build the path to the endpoint.
   */
  public constructor(parent: BaseOptions) {
    super(parent);
    this.me = new Me(parent);
  }

  /**
   * Get user list.
   * @returns The user list.
   */
  public async list(): Promise<ListUsersResponse> {
    try {
      const response = await this.instance.get('/users');
      return response.data as ListUsersResponse;
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }
}
