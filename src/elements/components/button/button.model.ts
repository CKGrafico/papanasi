import type { BaseProps, BaseState, Dynamic, Intent, Variant } from '~/models';

export interface ButtonProps extends BaseProps {
  variant?: Dynamic<Variant>;
  intent?: Dynamic<Intent>;
  outline?: boolean;
  disabled?: boolean;
}

export interface ButtonState extends BaseState {
  classes: { base: string };
}
