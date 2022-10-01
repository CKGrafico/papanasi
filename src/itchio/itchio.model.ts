import { BaseProps, BaseState } from '../../../models';

export type ItchioProps = {
  user: string;
  game: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
  secret?: string;
} & BaseProps;

export type ItchioState = {
  classes: { base: string };
  isLoadingGameInfo: boolean;
  gameInfo: {
    title: string;
    cover_image: string;
    price: string;
  };
} & BaseState;
