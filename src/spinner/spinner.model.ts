import { Dynamic, SharedProps, Variant } from '../../../models';

export type SpinnerProps = {
  variant?: Dynamic<Variant>;
  full?: boolean;
  fullscreen?: boolean;
} & SharedProps;
