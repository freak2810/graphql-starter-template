import { Context } from '../types/context';
import { LoginResponse } from '../types/generated';

/**
 * Add Cookie to the response
 *
 * @param context - context containing response object
 * @param result - result of the login
 */
export const addCookieToResponse = (context: Context, result: LoginResponse) => {
  // Set cookie for token and refresh token
  context.res.cookie('token', result.token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 6, // 6 hours
    secure: process.env.NODE_ENV === 'production',
  });

  context.res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
  });
};
