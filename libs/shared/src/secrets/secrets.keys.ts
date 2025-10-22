import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(process.cwd(), 'src/environment/.env') });

if (process.env.NODE_ENV === 'production') {
  dotenv.config({
    path: join(process.cwd(), 'src/environment/.env.prod'),
    override: true,
  });
}

function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
}

const PORT = parseInt(getEnvVariable('PORT'), 10);
const DB_NAME = getEnvVariable('DB_NAME');
const DB_TYPE = getEnvVariable('DB_TYPE') as 'postgres' | 'mysql' | 'mongodb';
const DB_HOST = getEnvVariable('DB_HOST');
const DB_PORT = parseInt(getEnvVariable('DB_PORT'), 10);
const DB_USERNAME = getEnvVariable('DB_USERNAME');
const DB_PASSWORD = getEnvVariable('DB_PASSWORD');
const SWAGGER_DOCS = getEnvVariable('SWAGGER_DOCS');
const JWT_SECRET = getEnvVariable('JWT_SECRET');
const NODE_ENV = getEnvVariable('NODE_ENV') as
  | 'development'
  | 'production'
  | 'test';
const SESSION_SECRET = getEnvVariable('SESSION_SECRET');
const API_VERSION = getEnvVariable('API_VERSION');
const PUBLIC_KEY = getEnvVariable('PUBLIC_KEY');
const LOG_LEVEL = getEnvVariable('LOG_LEVEL');
const SENTRY_DSN = getEnvVariable('SENTRY_DSN');

export const configVariables = {
  port: PORT,
  database: {
    name: DB_NAME,
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
  },
  swagger: {
    docs: SWAGGER_DOCS,
  },
  jwt: {
    secret: JWT_SECRET,
  },
  session: {
    secret: SESSION_SECRET,
  },
  api: {
    version: API_VERSION,
  },
  nodeEnv: NODE_ENV,
  publicKey: PUBLIC_KEY,
  sentry: {
    dsn: SENTRY_DSN,
  },
  logger: {
    level: LOG_LEVEL,
  },
} as const;
