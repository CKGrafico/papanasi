import { For, onMount, onUnMount, useMetadata, useStore } from '@builder.io/mitosis';
import { toastBus } from './toast.bus';
import './toast.css';
import type { ToastChannelEvent, ToastPayload, ToastProps, ToastState } from './toast.model';
import { toastService } from './toast.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Toast(props: ToastProps) {
  const state = useStore<ToastState>({
    get classes() {
      return toastService.getClasses(props.disabled, props.className || props.classList);
    },
    onChangeBus(event: ToastChannelEvent<ToastPayload>) {
      state.toasts = toastBus.state;
    },
    toastSubscription: null,
    toasts: []
  });

  onMount(() => {
    if (state.toastSubscription) {
      return;
    }

    const subscription = toastBus.subscribe(state.onChangeBus);
    state.toastSubscription = subscription;
  });

  onUnMount(() => {
    if (!state.toastSubscription) {
      return;
    }

    state.toastSubscription.unsubscribe();
  });

  return (
    <div class={state.classes.base}>
      <For each={state.toasts}>{(toast) => <div>{toast.message}</div>}</For>
      {props.children}
    </div>
  );
}
