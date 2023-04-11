import type { BaseProps, BaseState } from '~/models';

export interface ToastProps extends BaseProps {
  disabled?: boolean;
}

export interface ToastState extends BaseState {
  classes: { base: string };
  onChangeBus: (event: ToastChannelEvent<ToastPayload>) => void;
  toastSubscription: {
    unsubscribe(): void;
  };
}

export type ToastPayload = {
  message: string;
};

// TODO Move to generic
export type ToastChannelEvent<T> = {
  channel: string;
  payload: T | undefined;
};

export type ToastCallback<T> = (event: ToastChannelEvent<T>) => void;
