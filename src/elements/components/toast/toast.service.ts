import { classesToString, debug } from '~/helpers';

class ToastService {
  public getClasses(disabled: boolean, className: string) {
    const base = classesToString(['pa-toast', [disabled, 'is-disabled'], className || '']);

    debug(`ToastService getClasses: base: ${base}`);
    return { base };
  }
}

export const toastService = new ToastService();
