import { For, onMount, onUnMount, useMetadata, useStore } from '@builder.io/mitosis';
import './toast.css';
import type { ToastProps, ToastState } from './toast.model';
import { toastService } from './toast.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Toast(props: ToastProps) {
  const state = useStore<ToastState>({
    get classes() {
      return toastService.getClasses(props.disabled, props.className || props.classList);
    },
    get toasts() {
      return toastService.getToasts();
    },
    toastSubscription: null
  });

  onMount(() => {
    if (state.toastSubscription) {
      return;
    }

    // TODO: This approach doesnt work looks like is not reactive enough I will try other approach
    state.toastSubscription = toastService.subscribe();
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
