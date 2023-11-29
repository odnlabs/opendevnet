interface Config {
  name: string;
  defaultAvatar: string;
  social: {
    github: string;
    linkedin: string;
    youtube: string;
    email: string;
  };
  api: string;
  ws: string;
  website: string;
  webClient: string;
  internalDocs: string;
}

const requiredEnvVars = [
  'PUBLIC_API_URL',
  'PUBLIC_WS_URL',
  'PUBLIC_WEBSITE_URL',
  'PUBLIC_WEB_CLIENT_URL',
  'PUBLIC_INTERNAL_DOCS_URL',
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} is not set`);
  }
}

const config: Config = {
  name: 'Open Dev Net',
  defaultAvatar: '/default-avatar.png',
  social: {
    // NGINX will redirect these to the correct URLs
    github: '/github',
    linkedin: '/linkedin',
    youtube: '/youtube',
    email: 'mailto:slekupvimplyrataqq@protonmail.com',
  },
  api: process.env.PUBLIC_API_URL as string,
  ws: process.env.PUBLIC_WS_URL as string,
  website: process.env.PUBLIC_WEBSITE_URL as string,
  webClient: process.env.PUBLIC_WEB_CLIENT_URL as string,
  internalDocs: process.env.PUBLIC_INTERNAL_DOCS_URL as string,
};

export default config;
