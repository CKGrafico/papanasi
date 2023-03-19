import type { BaseProps, BaseState, BreakpointProps } from '~/models';

export interface RowProps extends BreakpointProps<'row' | 'column' | 'row-reverse' | 'column-reverse'>, BaseProps {}

export interface RowState extends BaseState {
  classes: { base: string };
}
