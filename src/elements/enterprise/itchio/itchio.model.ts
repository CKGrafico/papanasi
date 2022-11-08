import type { BaseProps, BaseState, Children } from '~/models';

export type ItchioGameInfo = {
  title: string;
  cover_image: string;
  price: string;
};

export type ItchioProps = {
  user: string;
  game: string;
  width?: number;
  height?: number;
  onLoad?: (info: ItchioGameInfo) => void;
  secret?: string;
  slotLoading?: Children;
} & BaseProps;

export type ItchioState = {
  classes: { base: string };
  gameInfo: ItchioGameInfo;
  onClickAction: (user: string, game: string, width: number, height: number) => void;
} & BaseState;
