import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(process.cwd(), 'src/environment/.env') });

// Override with .env.prod if NODE_ENV is production
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: join(process.cwd(), 'src/environment/.env.prod') });
}

// Export constants
export const PORT = process.env.PORT;
export const DB_NAME = process.env.DB_NAME;
export const DB_TYPE = process.env.DB_TYPE;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const SWAGGER_DOCS = process.env.SWAGGER_DOCS;
export const jwtSecret = process.env.JWT_SECRET;
export const NODE_ENV = process.env.NODE_ENV;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const API_VERSION = process.env.API_VERSION;
export const PUBLIC_KEY = 'isPublic';
