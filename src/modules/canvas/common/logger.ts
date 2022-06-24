const logFormat = (logFn: typeof console.log, namespace: string) => (message: string) => logFn(`[${namespace}] ${message}`);

export const useLogger = (namespace: string) => ({
  warn: logFormat(console.warn, namespace),
  debug: logFormat(console.debug, namespace),
  log: logFormat(console.log, namespace),
  error: logFormat(console.error, namespace),
  info: logFormat(console.info, namespace),
});
