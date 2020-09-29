export const strToTitlecase = (str: string): string => {
  return `${str.charAt(0).toLocaleUpperCase()}${str.slice(1, str.length)}`;
};
