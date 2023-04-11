import type { BaseProps, BaseState } from '~/models';

export interface ToastProps extends BaseProps {
  disabled?: boolean;
}

export interface ToastState extends BaseState {
  classes: { base: string };
  onChangeBus: (options: any) => any;
  subscription: {
    unsubscribe(): void;
  };
}
