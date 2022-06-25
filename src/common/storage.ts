import localforage from 'localforage';

localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'nline-app',
  version: 1,
  storeName: 'nline',
  description: 'nline local storage',
});

export { default as storage } from 'localforage';
