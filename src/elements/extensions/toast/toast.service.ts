import { classesToString, debug } from '~/helpers';
import { toastBus } from './toast.bus';
import { ToastChannelEvent, ToastPayload } from './toast.model';

class ToastService {
  private toasts: ToastPayload[] = [];

  private onChangeToasts(event: ToastChannelEvent<ToastPayload>) {
    this.toasts = toastBus.state();
    debug(`ToastService onChangeToasts: toasts: ${this.toasts}`);
  }

  public getClasses(disabled: boolean, className: string) {
    const base = classesToString(['pa-toast', [disabled, 'is-disabled'], className || '']);

    debug(`ToastService getClasses: base: ${base}`);
    return { base };
  }

  public getToasts() {
    return this.toasts;
  }

  public subscribe() {
    debug('ToastService subscribe');
    return toastBus.subscribe(this.onChangeToasts);
  }
}

export const toastService = new ToastService();
