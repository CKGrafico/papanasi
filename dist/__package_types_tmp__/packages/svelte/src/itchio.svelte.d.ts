/** @typedef {typeof __propDef.props}  ItchioProps */
/** @typedef {typeof __propDef.events}  ItchioEvents */
/** @typedef {typeof __propDef.slots}  ItchioSlots */
export default class Itchio extends SvelteComponentTyped<{
    className: any;
    user: any;
    game: any;
    width: any;
    height: any;
    secret: any;
    onLoad: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
    loading: {};
}> {
}
export type ItchioProps = typeof __propDef.props;
export type ItchioEvents = typeof __propDef.events;
export type ItchioSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        className: any;
        user: any;
        game: any;
        width: any;
        height: any;
        secret: any;
        onLoad: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
        loading: {};
    };
};
export {};
