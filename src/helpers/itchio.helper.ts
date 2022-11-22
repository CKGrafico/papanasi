// from https://static.itch.io/api.js
export const Itch: any = {};

Itch.getGameData = function (opts) {
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
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.addEventListener(
    'readystatechange',
    (function (_this) {
      return function (e) {
        if (xhr.readyState !== 4) {
          return;
        }
        const game = JSON.parse(xhr.responseText);
        return typeof opts.onComplete === 'function' ? opts.onComplete(game) : void 0;
      };
    })(this)
  );
  return xhr.send();
};
