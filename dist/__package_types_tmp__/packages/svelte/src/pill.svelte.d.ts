/** @typedef {typeof __propDef.props}  PillProps */
/** @typedef {typeof __propDef.events}  PillEvents */
/** @typedef {typeof __propDef.slots}  PillSlots */
export default class Pill extends SvelteComponentTyped<{
    variant: any;
    intent: any;
    disabled: any;
    className: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type PillProps = typeof __propDef.props;
export type PillEvents = typeof __propDef.events;
export type PillSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        variant: any;
        intent: any;
        disabled: any;
        className: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
