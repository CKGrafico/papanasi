import type { BaseProps, BaseState, BreakpointProps } from '~/models';

export interface ColumnProps
  extends BreakpointProps<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'content' | 'fill' | 'hide'>,
    BaseProps {
  centered?: boolean;
}

export interface ColumnState extends BaseState {
  classes: { base: string };
}
