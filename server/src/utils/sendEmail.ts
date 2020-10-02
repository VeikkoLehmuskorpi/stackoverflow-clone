import nodemailer from 'nodemailer';
import { APPLICATION_NAME, APPLICATION_NAME_URL_SAFE } from '../constants';

interface EmailFields {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (emailFields: EmailFields) => {
  const { to, subject, html } = emailFields;

  if (!to) throw new Error('Email field "to" is a required field');
  if (!subject) throw new Error('Email field "subject" is a required field');
  if (!html) throw new Error('Email field "html" is a required field');

  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: `${process.env.EMAIL_HOST}`,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_USES_SSL === 'true' ? true : false, // true for 465, false for other ports
    auth: {
      user: `${process.env.EMAIL_USERNAME}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });

  const info = await transporter.sendMail({
    from: `"${APPLICATION_NAME}" <noreply@${APPLICATION_NAME_URL_SAFE}.com>`,
    to,
    subject,
    html,
  });

  return info;
};
