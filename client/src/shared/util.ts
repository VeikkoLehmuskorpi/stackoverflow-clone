import { FieldError, FormError } from './types';

export const strToTitlecase = (str: string): string => {
  return `${str.charAt(0).toLocaleUpperCase()}${str.slice(1, str.length)}`;
};

export const formatFormErrorMsg = (str: string): string => {
  const titlecaseStr = strToTitlecase(str);
  const dotAppendedStr =
    titlecaseStr.charAt(titlecaseStr.length - 1) === '.'
      ? `${titlecaseStr}`
      : `${titlecaseStr}.`;

  return dotAppendedStr;
};

export const toFormErrorMap = (errors: FieldError[]) => {
  const errorMap: FormError[] = [];
  errors.forEach(({ property, constraints }) => {
    errorMap.push({
      name: property,
      errors: Object.values(constraints).map(constraint =>
        formatFormErrorMsg(constraint)
      ),
    });
  });

  return errorMap;
};
