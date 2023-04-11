import { onMount, onUnMount, useMetadata, useStore } from '@builder.io/mitosis';
import { toastBus } from '../../extensions/toast/toast.bus';
import './toast.css';
import type { ToastProps, ToastState } from './toast.model';
import { toastService } from './toast.service';

useMetadata({ isAttachedToShadowDom: true });

export default function ToastContainer(props: ToastProps) {
  const state = useStore<ToastState>({
    get classes() {
      return toastService.getClasses(props.disabled, props.className || props.classList);
    },
    onChangeBus(options: any) {
      console.log(options, 'from component');
    },
    subscription: null
  });

  onMount(() => {
    const subscription = toastBus.subscribe<any>('ACTIONNNNNN', state.onChangeBus);
    state.subscription = subscription;
  });

  onUnMount(() => {
    if (!state.subscription) {
      return;
    }

    state.subscription.unsubscribe();
  });

  return <div class={state.classes.base}>{props.children}</div>;
}
