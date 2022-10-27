import { BaseProps, BaseState, BreakpointProps } from '../models';
export declare type ColumnProps = BreakpointProps<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'content' | 'fill' | 'hide'> & BaseProps;
export declare type ColumnState = {
    classes: {
        base: string;
    };
} & BaseState;
