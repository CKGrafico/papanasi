import { BaseProps, Dynamic, Intent, Variant } from '../../../models';

export type PillProps = {
  variant?: Dynamic<Variant>;
  intent?: Dynamic<Intent>;
  disabled?: boolean;
} & BaseProps;
