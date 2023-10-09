import axios, { AxiosInstance } from 'axios';

export interface BaseOptions {
  instance: AxiosInstance;
  tokenKey: string;
  baseApiUrl: string;
  baseWebUrl: string;
}

/**
 * The base class for all API clients classes.
 */
export class Base {
  protected axios = axios;

  protected instance: AxiosInstance;
  protected tokenKey: string;

  protected baseApiUrl: string;
  protected baseWebUrl: string;

  /**
   * Creates a new client instance of the base class.
   * @param options The options for the base class.
   */
  public constructor(options: BaseOptions) {
    this.instance = options.instance;
    this.tokenKey = options.tokenKey;
    this.baseApiUrl = options.baseApiUrl;
    this.baseWebUrl = options.baseWebUrl;
  }

  /**
   * Gets the error message from a request error.
   * @param error The error to convert to a string.
   * @returns The error as a string.
   */
  protected getErrorMessage(error: unknown): string {
    if (this.axios.isAxiosError(error)) {
      // Convert Axios error to string
      const errorString =
        (error.response?.data as { message?: string })?.message ??
        error.message;

      return errorString;
    } else {
      // Convert other error to string
      const errorString = String(error);
      return errorString;
    }
  }

  /**
   * Gets the token for the current user, or redirects to the login page if the user is not logged in.
   * @returns The token for the current user.
   */
  // protected getToken(): string {
  //   return '';
  // }
}
