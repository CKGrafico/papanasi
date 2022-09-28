import { Dynamic, SharedProps, Variant } from '../../../models';

export type AvatarProps = {
  variant?: Dynamic<Variant>;
  name?: string;
  unavatar?: string;
  url?: string;
  disabled?: boolean;
} & SharedProps;
