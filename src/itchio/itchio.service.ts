import { addScript, classesToString, waitUntilTrue } from '~/helpers';
import { ExternalLibrary } from '~/models';
import { ItchioGameInfo } from './itchio.model';

const global: Window & ExternalLibrary = window;

class ItchioService {
  public getClasses(className: string) {
    const base = classesToString(['pa-itchio', className || '']);

    return { base };
  }

  public attachButton(actionRef, user: string, game: string, width: number, height: number) {
    global.Itch.attachBuyButton(actionRef, {
      user: user,
      game: game,
      width: width || 800,
      height: height || 600
    });
  }

  public async getGameData(
    actionRef,
    user: string,
    game: string,
    width: number,
    height: number,
    secret: string
  ): Promise<ItchioGameInfo> {
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

  public async processInfo(
    actionRef,
    user: string,
    game: string,
    width: number,
    height: number,
    secret: string,
    callback: (data: ItchioGameInfo) => void
  ) {
    await this.loadScript();
    const data = await this.getGameData(actionRef, user, game, width, height, secret);

    callback && callback(data);
  }
}

export const itchioService = new ItchioService();
