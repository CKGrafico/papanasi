import type { BaseProps, BaseState, CSS, Dynamic, Variant } from '~/models';

export type AvatarProps = {
  variant?: Dynamic<Variant>;
  name?: string;
  unavatar?: string;
  url?: string;
  disabled?: boolean;
} & BaseProps;

export type AvatarState = {
  classes: { base: string; container: string };
  styles: { container: CSS };
  initials: string;
  source: string;
} & BaseState;
