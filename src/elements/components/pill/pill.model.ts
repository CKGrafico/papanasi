import type { BaseProps, BaseState, Dynamic, Intent, Variant } from '~/models';

export type PillProps = {
  variant?: Dynamic<Variant>;
  intent?: Dynamic<Intent>;
  disabled?: boolean;
} & BaseProps;

export type PillState = {
  classes: { base: string };
} & BaseState;
