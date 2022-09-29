import { BaseProps, BreakpointProps } from '../../../models';

export type RowProps = BaseProps & BreakpointProps<'row' | 'column' | 'row-reverse' | 'column-reverse'> & BaseProps;
