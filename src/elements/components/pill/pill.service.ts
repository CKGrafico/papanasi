import { classesToString, debug } from '~/helpers';

class PillService {
  public getClasses(variant: string, intent: string, disabled: boolean, className: string) {
    const base = classesToString([
      'pa-pill',
      [variant, `pa-pill--${variant}`],
      [intent, `is-${intent}`],
      [disabled, 'is-disabled'],
      className || ''
    ]);

    debug(`PillService getClasses: base: ${base}`);
    return { base };
  }
}

export const pillService = new PillService();
