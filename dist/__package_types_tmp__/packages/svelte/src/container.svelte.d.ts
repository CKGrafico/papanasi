/** @typedef {typeof __propDef.props}  ContainerProps */
/** @typedef {typeof __propDef.events}  ContainerEvents */
/** @typedef {typeof __propDef.slots}  ContainerSlots */
export default class Container extends SvelteComponentTyped<{
    fluid: any;
    className: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type ContainerProps = typeof __propDef.props;
export type ContainerEvents = typeof __propDef.events;
export type ContainerSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        fluid: any;
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
