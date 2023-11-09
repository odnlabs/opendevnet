declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENVIRONMENT: string;
      DEBUG: string;

      PUBLIC_API_URL: string;
      PUBLIC_WS_URL: string;
      PUBLIC_SITE_URL: string;
      PUBLIC_WEB_CLIENT_URL: string;

      MONGODB_URI: string;
    }
  }
}
