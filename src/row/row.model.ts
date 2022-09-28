import { BreakpointProps, SharedProps } from '../../../models';

export type RowProps = SharedProps & BreakpointProps<'row' | 'column' | 'row-reverse' | 'column-reverse'>;
