declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV?: 'development' | 'production' | 'testing';
    DATABASE_URL: string;
    DB_NAME: string;
    PORT: string;

    NOTIFICATION_SRV_URL: string;

    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
  }
}
