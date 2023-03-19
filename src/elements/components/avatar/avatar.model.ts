import type { BaseProps, BaseState, CSS, Dynamic, Variant } from '~/models';

export interface AvatarProps extends BaseProps {
  variant?: Dynamic<Variant>;
  name?: string;
  unavatar?: string;
  url?: string;
  disabled?: boolean;
}

export interface AvatarState extends BaseState {
  classes: { base: string; container: string };
  styles: { container: CSS };
  initials: string;
  source: string;
}
