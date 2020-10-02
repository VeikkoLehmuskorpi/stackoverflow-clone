import { customAlphabet } from 'nanoid';
import { UID_ALPHABET, UID_LENGTH } from '../constants';

export const generateUid = customAlphabet(UID_ALPHABET, UID_LENGTH);
