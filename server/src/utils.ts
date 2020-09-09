import { customAlphabet } from 'nanoid';
import { validate } from 'class-validator';
import { UID_ALPHABET, UID_LENGTH } from './constants';

export const nanoid = customAlphabet(UID_ALPHABET, UID_LENGTH);

export const validateInputs = (entity: Object) =>
  validate(entity, { validationError: { target: false } });
