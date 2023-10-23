declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENVIRONMENT: string;
      DEBUG: string;

      API_HTTP_PORT: string;
      API_URL: string;
      SITE_URL: string;
      WEB_URL: string;

      MONGODB_URI: string;
    }
  }
}
