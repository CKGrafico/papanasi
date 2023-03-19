import { debug } from './debug.helper';

let version = '0.0.0';

export function setVersion(newVersion: string) {
  debug(`Setting new platform ${newVersion}`);

  version = newVersion;
}

export function getVersion(): string {
  return version;
}
