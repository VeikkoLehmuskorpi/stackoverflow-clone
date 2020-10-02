import { customAlphabet } from 'nanoid';
import { TOKEN_ALPHABET, TOKEN_LENGTH } from '~/constants';

export const generateToken = customAlphabet(TOKEN_ALPHABET, TOKEN_LENGTH);
