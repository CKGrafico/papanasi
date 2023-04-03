// from https://static.itch.io/api.js
export const Itch: any = {};
import { ofetch } from 'ofetch';

Itch.getGameData = async function (opts) {
  if (opts == null) {
    opts = {};
  }
  const domain = opts.domain || 'itch.io';
  if (!opts.user) {
    throw new Error('Missing user');
  }
  if (!opts.game) {
    throw new Error('Missing game');
  }
  let url = 'https://' + opts.user + '.' + domain + '/' + opts.game + '/data.json';
  if (opts.secret) {
    url = url + '?secret=' + opts.secret;
  }

  const game = await ofetch(url, { parseResponse: JSON.parse });

  return typeof opts.onComplete === 'function' ? opts.onComplete(game) : void 0;
};
