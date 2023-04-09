import { config } from 'dotenv';

config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '4000',

  NOTIFICATION_SRV_URL: process.env.NOTIFICATION_SRV_URL,

  DATABASE_URL: process.env.DATABASE_URL,
  DB_NAME: process.env.DB_NAME,

  USER_COLLECTION: 'user',
  LOGIN_HISTORY_COLLECTION: 'login_history',
  OTP_COLLECTION: 'otp',

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};

export const testMongoConfig = {
  Memory: true,
  IP: '127.0.0.1',
  Port: '27017',
  Database: 'some-db',
};
