import { addScript, waitUntilTrue } from '../../../helpers';
import { ExternalLibrary } from '../../../models';

const global: Window & ExternalLibrary = window;

class ItchioService {
  public attachButton(actionRef, props) {
    global.Itch.attachBuyButton(actionRef, {
      user: props.user,
      game: props.game,
      width: props.width || 800,
      height: props.height || 600
    });
  }

  public async getGameData(actionRef, props) {
    return new Promise((resolve) => {
      global.Itch.getGameData({
        user: props.user,
        game: props.game,
        secret: props.secret,
        onComplete: (data) => {
          this.attachButton(actionRef, props);
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
