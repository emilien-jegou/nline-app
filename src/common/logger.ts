const logFormat = (logFunction: typeof console.log, namespace: string) => (message: string) =>
  logFunction(`[${namespace}] ${message}`);

/* eslint-disable no-console */
export const useLogger = (namespace: string) => ({
  warn: logFormat(console.warn, namespace),
  debug: logFormat(console.debug, namespace),
  log: logFormat(console.log, namespace),
  error: logFormat(console.error, namespace),
  info: logFormat(console.info, namespace),
});
/* eslint-enable no-console */
