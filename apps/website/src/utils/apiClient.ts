import { Client } from '@odnlabs/api-client';

if (!process.env.PUBLIC_API_URL) {
  throw new Error('API_URL environment variable is not set');
}

if (!process.env.PUBLIC_WEB_CLIENT_URL) {
  throw new Error('WEB_CLIENT_URL environment variable is not set');
}

const client = new Client({
  baseApiUrl: process.env.PUBLIC_API_URL,
  baseWebAppUrl: process.env.PUBLIC_WEB_CLIENT_URL,
});

export default client;
