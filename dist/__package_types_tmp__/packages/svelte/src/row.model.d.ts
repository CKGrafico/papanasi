import { BaseProps, BaseState, BreakpointProps } from '../models';
export declare type RowProps = BaseProps & BreakpointProps<'row' | 'column' | 'row-reverse' | 'column-reverse'> & BaseProps;
export declare type RowState = {
    classes: {
        base: string;
    };
} & BaseState;
