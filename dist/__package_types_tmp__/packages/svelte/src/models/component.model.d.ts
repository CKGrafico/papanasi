export declare type BaseProps = {
    className?: string;
    class?: string;
    children?: Children;
};
export declare type BaseState = {
    loaded: boolean;
};
export declare type Children = any;
export declare type CSS = Partial<CSSStyleDeclaration> & {
    [key: string]: Partial<CSSStyleDeclaration> | string;
};
