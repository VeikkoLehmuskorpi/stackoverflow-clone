export const __prod__ = process.env.NODE_ENV === 'production';

export const UID_ALPHABET = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
export const UID_LENGTH = 11;

export const TOKEN_ALPHABET = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
export const TOKEN_LENGTH = 128;

export const APPLICATION_NAME = 'StackOverflow Clone';
export const APPLICATION_NAME_URL_SAFE = 'stackoverflow-clone';

export const PASSWORD_RESET_CHANGE_BASE_URL = `/users/password-reset/change`;
export const PASSWORD_RESET_SUBJECT = `${APPLICATION_NAME} password reset`;

export const USER_PREFIX = 'user';
export const FORGOT_PASSWORD_PREFIX = 'forgot-password';
