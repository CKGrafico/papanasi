import { BaseProps, BaseState, Dynamic, Intent, Variant } from '~/models';

export type ButtonProps = {
  variant?: Dynamic<Variant>;
  intent?: Dynamic<Intent>;
  outline?: boolean;
  disabled?: boolean;
} & BaseProps;

export type ButtonState = {
  classes: { base: string };
} & BaseState;
