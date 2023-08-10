interface ClientOptions {
  apiKey: string;
}

/**
 * The main client class, used to interact with the API.
 */
export class Client {
  apiKey: string;

  /**
   * Create a new client instance.
   * @param options The client options.
   */
  public constructor(options: ClientOptions) {
    this.apiKey = options.apiKey;
  }
}
