import { Dynamic, Intent, SharedProps, Variant } from '../../../models';

export type PillProps = {
  variant?: Dynamic<Variant>;
  intent?: Dynamic<Intent>;
  disabled?: boolean;
} & SharedProps;
