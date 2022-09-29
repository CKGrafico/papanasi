import { classesToString } from '../../../helpers';

class ButtonService {
  public getClasses(variant: string, outline: string, intent: string, disabled: boolean, className: string) {
    const base = classesToString([
      'pa-button',
      [variant, `pa-button--${variant}`],
      [outline, 'pa-button--outline'],
      [intent, `is-${intent}`],
      [disabled, 'is-disabled'],
      className || ''
    ]);

    return { base };
  }
}

export const buttonService = new ButtonService();
