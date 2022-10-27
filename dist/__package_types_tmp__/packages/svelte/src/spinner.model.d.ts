import { BaseProps, BaseState, Dynamic, Variant } from '../models';
export declare type SpinnerProps = {
    variant?: Dynamic<Variant>;
    full?: boolean;
    fullscreen?: boolean;
} & BaseProps;
export declare type SpinnerState = {
    classes: {
        base: string;
    };
} & BaseState;
