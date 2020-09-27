import { customAlphabet } from 'nanoid';
import { validate } from 'class-validator';
import { UID_ALPHABET, UID_LENGTH } from './constants';
import { UniqueConstraintErr } from './types';

export const generateUid = customAlphabet(UID_ALPHABET, UID_LENGTH);

export const validateInputs = (entity: Object): Promise<unknown[]> =>
  validate(entity, { validationError: { target: false } });

export const parseFieldFromUniqConstrErr = (uniqConstrStr: String): String => {
  return uniqConstrStr.split(/[()]/)[1];
};

export const generateUniqConstrErr = (
  uniqConstrStr: String
): UniqueConstraintErr[] => {
  const field = parseFieldFromUniqConstrErr(uniqConstrStr);
  return [
    { property: field, constraints: { unique: `${field} is already taken` } },
  ];
};
