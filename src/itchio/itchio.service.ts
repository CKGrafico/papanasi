import { addScript, waitUntilTrue } from '../../../helpers';
import { ExternalLibrary } from '../../../models';

const global: Window & ExternalLibrary = window;

class ItchioService {
  public attachButton(actionRef, user, game, width, height) {
    global.Itch.attachBuyButton(actionRef, {
      user: user,
      game: game,
      width: width || 800,
      height: height || 600
    });
  }

  public async getGameData(actionRef, user, game, width, height, secret) {
    return new Promise((resolve) => {
      global.Itch.getGameData({
        user: user,
        game: game,
        secret: secret,
        onComplete: (data) => {
          this.attachButton(actionRef, user, game, width, height);
          resolve(data);
        }
      });
    });
  }
  public async loadScript() {
    await addScript('https://static.itch.io/api.js', 'itchio');
    await waitUntilTrue(() => global.Itch);
  }
}

export const itchioService = new ItchioService();
