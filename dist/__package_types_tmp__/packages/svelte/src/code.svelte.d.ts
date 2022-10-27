/** @typedef {typeof __propDef.props}  CodeProps */
/** @typedef {typeof __propDef.events}  CodeEvents */
/** @typedef {typeof __propDef.slots}  CodeSlots */
export default class Code extends SvelteComponentTyped<{
    links: any;
    disableCopy: any;
    code: any;
    language: any;
    theme: any;
    className: any;
    editable: any;
    onUpdate: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    copy: {};
}> {
}
export type CodeProps = typeof __propDef.props;
export type CodeEvents = typeof __propDef.events;
export type CodeSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        links: any;
        disableCopy: any;
        code: any;
        language: any;
        theme: any;
        className: any;
        editable: any;
        onUpdate: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        copy: {};
    };
};
export {};
