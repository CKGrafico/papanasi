import { getWindow } from 'ssr-window';
import { addScript, classesToString, waitUntilTrue } from '~/helpers';
import type { ItchioGameInfo } from './itchio.model';

class ItchioService {
  public getClasses(className: string) {
    const base = classesToString(['pa-itchio', className || '']);

    return { base };
  }

  public async getGameData(user: string, game: string, secret: string): Promise<ItchioGameInfo> {
    const window = getWindow();

    return new Promise((resolve) => {
      window['Itch'].getGameData({
        user: user,
        game: game,
        secret: secret,
        onComplete: (data) => {
          resolve(data);
        }
      });
    });
  }

  public async loadScript() {
    const window = getWindow();

    await addScript('https://static.itch.io/api.js', 'itchio');
    await waitUntilTrue(() => window['Itch']);
  }

  public async processInfo(user: string, game: string, secret: string, callback: (data: ItchioGameInfo) => void) {
    await this.loadScript();
    const data = await this.getGameData(user, game, secret);

    callback && callback(data);
  }

  public onClickAction(user: string, game: string, width = 800, height = 600) {
    const window = getWindow();

    const domain = 'itch.io';
    const top = (screen.height - height) / 2;
    const left = (screen.width - width) / 2;

    const openedWindow = window.open(
      'https://' + user + '.' + domain + '/' + game + '/purchase?popup=1',
      'purchase',
      'scrollbars=1, resizable=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
    );

    if (typeof openedWindow.focus === 'function') {
      openedWindow.focus();
    }
  }
}

export const itchioService = new ItchioService();
