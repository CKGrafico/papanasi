import type { BaseProps, BaseState, Dynamic, Variant } from '~/models';

export interface SpinnerProps extends BaseProps {
  variant?: Dynamic<Variant>;
  full?: boolean;
  fullscreen?: boolean;
}

export interface SpinnerState extends BaseState {
  classes: { base: string };
}
