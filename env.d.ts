declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'staging' | 'production';
      NODE_PORT: number | string;
      MONGO_URL: string;
      MONGO_USERNAME: string;
      MONGO_PASS: string;
    }
  }
}

export {};
