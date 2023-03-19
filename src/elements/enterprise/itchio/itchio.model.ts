import type { BaseProps, BaseState, Children } from '~/models';

export type ItchioGameInfo = {
  title: string;
  cover_image: string;
  price: string;
};

export interface ItchioProps extends BaseProps {
  user: string;
  game: string;
  width?: number;
  height?: number;
  onLoad?: (info: ItchioGameInfo) => void;
  secret?: string;
  slotLoading?: Children;
}

export interface ItchioState extends BaseState {
  classes: { base: string };
  gameInfo: ItchioGameInfo;
  onClickAction: (user: string, game: string, width: number, height: number) => void;
}
