import type { BaseProps, BaseState } from '~/models';

export type ContainerProps = {
  fluid?: boolean;
} & BaseProps;

export type ContainerState = {
  classes: { base: string };
} & BaseState;
