import type { BaseProps, BaseState, Dynamic, Variant } from '~/models';

export type SpinnerProps = {
  variant?: Dynamic<Variant>;
  full?: boolean;
  fullscreen?: boolean;
} & BaseProps;

export type SpinnerState = {
  classes: { base: string };
} & BaseState;
