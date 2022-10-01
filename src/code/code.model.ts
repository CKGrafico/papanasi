import { BaseProps, BaseState } from '~/models';

export type CodeProps = {
  editable: boolean;
  languages: string[];
  code: string;
  theme?: string; // TODO: dynamic themes
  links?: { label: string; url: string; icon: string }[];
  canCopy?: boolean;
  copyLabel?: string;
  onUpdate?: (text: string) => void;
  onExit?: (text: string) => void;
} & BaseProps;

export type CodeState = {
  classes: { base: string };
} & BaseState;
