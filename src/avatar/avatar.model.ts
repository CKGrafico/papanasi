import { Dynamic, SharedProps, Variant } from '../../../models';

export type AvatarProps = {
  variant?: Dynamic<Variant>;
  name?: string;
  unavatar?: string;
  url?: string;
  disabled?: boolean;
} & SharedProps;

export type AvatarState = {
  loaded: boolean;
  classes: { base: string; container: string };
  styles: {
    container: Partial<CSSStyleDeclaration> & {
      [key: string]: Partial<CSSStyleDeclaration> | string;
    };
  };
  initials: string;
  src: string;
};
