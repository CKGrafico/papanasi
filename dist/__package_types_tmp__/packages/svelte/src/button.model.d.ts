import { BaseProps, BaseState, Dynamic, Intent, Variant } from '../models';
export declare type ButtonProps = {
    variant?: Dynamic<Variant>;
    intent?: Dynamic<Intent>;
    outline?: boolean;
    disabled?: boolean;
} & BaseProps;
export declare type ButtonState = {
    classes: {
        base: string;
    };
} & BaseState;
