import { PhoneNumber } from 'libphonenumber-js';
import { Db } from 'mongodb';

export interface Context {
  db: Db;
  user: LoggedInUser | null;
}

export type AuthenticationStrategy = string;

export type UserName = {
  first: string;
  last: string;
};

export interface LoggedInUser {
  _id: string;
  email?: string | null | undefined;
  name: UserName;
  phoneNumber?: PhoneNumber | null | undefined;
  strategies: Array<AuthenticationStrategy>;
  createdAt: Date;
  updatedAt?: Date | null | undefined;
}
