import { customAlphabet } from 'nanoid';
import { UID_ALPHABET, UID_LENGTH } from './constants';

export const nanoid = customAlphabet(UID_ALPHABET, UID_LENGTH);
