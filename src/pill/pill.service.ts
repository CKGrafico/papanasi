import { classesToString } from '../../../helpers';

class PillService {
  public getClasses(variant: string, intent: string, disabled: boolean, className: string) {
    const base = classesToString([
      'pa-pill',
      [variant, `pa-pill--${variant}`],
      [intent, `is-${intent}`],
      [disabled, 'is-disabled'],
      className || ''
    ]);

    return { base };
  }
}

export const pillService = new PillService();
