import { BaseProps, Dynamic, Variant } from '../../../models';

export type SpinnerProps = {
  variant?: Dynamic<Variant>;
  full?: boolean;
  fullscreen?: boolean;
} & BaseProps;
