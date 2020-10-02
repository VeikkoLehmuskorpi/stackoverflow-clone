import { APPLICATION_NAME } from '~/constants';

interface PasswordResetOptions {
  email: string;
  resetUrl: URL;
}

export const createPasswordResetHtml = (options: PasswordResetOptions) => {
  const { email, resetUrl } = options;

  return `
    <p>Hello,</p>

    <p>We received a password reset request for your ${APPLICATION_NAME} account registered under "${email}" email address. If you weren't the one to request the password reset, you can safely ignore this message.</p>

    <p>Please click the link below to reset your password.</p>

    <p><a href="${resetUrl.href}">Reset my password</a></p>

    <p>Thanks,</p>
    <p>${APPLICATION_NAME}</p>
  `;
};
