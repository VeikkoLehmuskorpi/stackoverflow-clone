import { FieldError } from 'src/types';
import { strToTitlecase } from 'src/utils/strToTitlecase';

export interface FormError {
  name: string;
  errors: Array<string>;
}

const formatFormErrorMsg = (str: string): string => {
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
