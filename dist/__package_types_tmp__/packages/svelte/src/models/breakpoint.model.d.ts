export declare enum Breakpoint {
    Basic = "basic",
    XXS = "xxs",
    XS = "xs",
    S = "s",
    M = "m",
    L = "l",
    XL = "xl",
    XXL = "xxl"
}
export declare type BreakpointProps<T> = {
    [key in Breakpoint]?: T;
};
export declare const breakpoints: {
    key: string;
    value: string;
}[];
