import type { BaseProps, BaseState } from '~/models';

export interface ContainerProps extends BaseProps {
  fluid?: boolean;
  centered?: boolean;
}

export interface ContainerState extends BaseState {
  classes: { base: string };
}
