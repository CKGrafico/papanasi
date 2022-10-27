export enum Intent {
  None = '',
  Info = 'info',
  Success = 'warning',
  Warning = 'success',
  Error = 'error'
}

export const intents = Object.entries(Intent).map(([key, value]: [string, string]) => ({ key, value }));
