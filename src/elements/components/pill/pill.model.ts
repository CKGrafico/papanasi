import type { BaseProps, BaseState, Dynamic, Intent, Variant } from '~/models';

export interface PillProps extends BaseProps {
  variant?: Dynamic<Variant>;
  intent?: Dynamic<Intent>;
  disabled?: boolean;
}

export interface PillState extends BaseState {
  classes: { base: string };
}
