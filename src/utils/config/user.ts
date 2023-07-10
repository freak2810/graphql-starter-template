import { parsePhoneNumber } from 'libphonenumber-js';

import { LoggedInUser } from '../types/context';

/**
 * This function will parse the token passed from the Apollo Federation Gateway.
 * A few points to take care of
 * * The token is passed as a stringified JSON object
 * * The token should be passed in the header as `x-user`
 * * You can access the user as `context.user` in the resolvers.
 * * You can customize the type of the user by changing {@link LoggedInUser}
 *
 * @param header The header passed from the Apollo Federation Gateway
 * @returns Details of the logged in user, if any. Else, null.
 *
 */
export const getUserFromHeader = (header: string | undefined | string[]) => {
  if (!header || Array.isArray(header)) return null;

  const user = JSON.parse(header) as LoggedInUser | null;

  if (user?.phoneNumber) user.phoneNumber = parsePhoneNumber(user?.phoneNumber as never);

  return user;
};
