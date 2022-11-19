import { classesToString, debug } from '~/helpers';

class ButtonService {
  public getClasses(variant: string, outline: boolean, intent: string, disabled: boolean, className: string) {
    const base = classesToString([
      'pa-button',
      [variant, `pa-button--${variant}`],
      [outline, 'pa-button--outline'],
      [intent, `is-${intent}`],
      [disabled, 'is-disabled'],
      className || ''
    ]);

    debug(`ButtonService getClasses: base: ${base}`);
    return { base };
  }
}

export const buttonService = new ButtonService();
