/** @typedef {typeof __propDef.props}  AvatarProps */
/** @typedef {typeof __propDef.events}  AvatarEvents */
/** @typedef {typeof __propDef.slots}  AvatarSlots */
export default class Avatar extends SvelteComponentTyped<{
    name: any;
    variant: any;
    disabled: any;
    className: any;
    url: any;
    unavatar: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type AvatarProps = typeof __propDef.props;
export type AvatarEvents = typeof __propDef.events;
export type AvatarSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        name: any;
        variant: any;
        disabled: any;
        className: any;
        url: any;
        unavatar: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
