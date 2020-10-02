import { validate } from 'class-validator';

export const validateInputs = (entity: Object): Promise<unknown[]> =>
  validate(entity, { validationError: { target: false } });
