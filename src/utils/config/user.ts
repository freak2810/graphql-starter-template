import { parsePhoneNumber } from 'libphonenumber-js';

import { LoggedInUser } from '../types/context';

export const getUserFromHeader = (header: string | undefined | string[]) => {
  if (!header || Array.isArray(header)) return null;

  const user = JSON.parse(header) as LoggedInUser | null;

  if (user?.phoneNumber) user.phoneNumber = parsePhoneNumber(user?.phoneNumber as never);

  return user;
};
