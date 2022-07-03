import { customAlphabet } from 'nanoid';

export type ID = string;

// eslint-disable-next-line no-secrets/no-secrets
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 7);

export const getID = (): ID => nanoid();
