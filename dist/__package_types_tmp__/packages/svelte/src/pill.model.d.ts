import { BaseProps, BaseState, Dynamic, Intent, Variant } from '../models';
export declare type PillProps = {
    variant?: Dynamic<Variant>;
    intent?: Dynamic<Intent>;
    disabled?: boolean;
} & BaseProps;
export declare type PillState = {
    classes: {
        base: string;
    };
} & BaseState;
