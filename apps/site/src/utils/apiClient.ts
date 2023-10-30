import { Client } from '@odnlabs/api-client';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('API_URL environment variable is not set');
}

if (!process.env.NEXT_PUBLIC_WEB_URL) {
  throw new Error('WEB_URL environment variable is not set');
}

const client = new Client({
  baseApiUrl: process.env.NEXT_PUBLIC_API_URL,
  baseWebUrl: process.env.NEXT_PUBLIC_WEB_URL,
});

export default client;
