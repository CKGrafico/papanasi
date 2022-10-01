import { BaseProps, BaseState } from '~/models';

export type ItchioProps = {
  user: string;
  game: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
  secret?: string;
} & BaseProps;

export type ItchioGameInfo = {
  title: string;
  cover_image: string;
  price: string;
};

export type ItchioState = {
  classes: { base: string };
  gameInfo: ItchioGameInfo;
} & BaseState;
