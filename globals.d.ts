declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV?: 'development' | 'production' | 'testing';
    DATABASE_URL: string;
    PORT: string;
  }
}
