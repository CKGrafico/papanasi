import { getWindow } from 'ssr-window';
import { classesToString, debug, Itch } from '~/helpers';
import type { ItchioGameInfo } from './itchio.model';

class ItchioService {
  public getClasses(className: string) {
    const base = classesToString(['pa-itchio', className || '']);

    return { base };
  }

  public async getGameData(user: string, game: string, secret: string): Promise<ItchioGameInfo> {
    debug(`ItchioService getGameData: user: ${user}, game: ${game}`);

    return new Promise((resolve) => {
      Itch.getGameData({
        user: user,
        game: game,
        secret: secret,
        onComplete: (data) => {
          debug(`ItchioService getGameData onComplete: data: ${JSON.stringify(data)}`);
          resolve(data);
        }
      });
    });
  }

  public async processInfo(user: string, game: string, secret: string) {
    const data = await this.getGameData(user, game, secret);

    return data;
  }

  public onClickAction(user: string, game: string, width = 800, height = 600) {
    const window = getWindow();

    const domain = 'itch.io';
    const top = (screen.height - height) / 2;
    const left = (screen.width - width) / 2;

    debug(`ItchioService onClickAction: user: ${user}, game: ${game}, top: ${top}, left: ${left}`);
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
