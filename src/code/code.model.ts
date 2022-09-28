import { SharedProps } from '../../../models';

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
} & SharedProps;
