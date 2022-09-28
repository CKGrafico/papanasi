import { BreakpointProps, SharedProps } from '../../../models';

export type ColumnProps = BreakpointProps<
  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'content' | 'fill' | 'hide'
> &
  SharedProps;
