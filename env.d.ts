/**
 * Types for NodeJs
 * Specifically environment variables typing
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'staging' | 'production';
      NODE_PORT: number | string;
      MONGO_URI: string;
      MONGO_USERNAME: string;
      MONGO_PASS: string;
    }
  }
}

export {};
