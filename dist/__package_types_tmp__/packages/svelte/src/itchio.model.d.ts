import { BaseProps, BaseState, Children } from '../models';
export declare type ItchioGameInfo = {
    title: string;
    cover_image: string;
    price: string;
};
export declare type ItchioProps = {
    user: string;
    game: string;
    width?: number;
    height?: number;
    onLoad?: (info: ItchioGameInfo) => void;
    secret?: string;
    slotLoading?: Children;
} & BaseProps;
export declare type ItchioState = {
    classes: {
        base: string;
    };
    gameInfo: ItchioGameInfo;
} & BaseState;
