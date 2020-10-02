export const formClientUrl = (): URL => {
  const { CLIENT_DOMAIN, CLIENT_PORT, CLIENT_USES_SSL } = process.env;

  const protocol = CLIENT_USES_SSL === 'true' ? 'https' : 'http';
  return new URL(`${protocol}://${CLIENT_DOMAIN}:${CLIENT_PORT}`);
};
