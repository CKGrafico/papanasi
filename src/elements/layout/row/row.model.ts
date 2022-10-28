import type { BaseProps, BaseState, BreakpointProps } from '~/models';

export type RowProps = BaseProps & BreakpointProps<'row' | 'column' | 'row-reverse' | 'column-reverse'> & BaseProps;

export type RowState = {
  classes: { base: string };
} & BaseState;
