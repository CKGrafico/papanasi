import { BaseProps, BaseState } from '~/models';

export type CodeProps = {
  editable: boolean;
  language: string;
  theme: CodeTheme;
  code: string;
  canCopy?: boolean;
  copyLabel?: string;
  links?: { label: string; url: string; icon: string }[];
  onUpdate?: (code: string) => void;
} & BaseProps;

export type CodeState = {
  classes: { base: string; editor: string };
  value: <T>(x: T, y: string) => string;
} & BaseState;

export enum CodeTheme {
  'default' = 'default',
  'dark' = 'dark',
  'atom-one-light' = 'atom-one-light',
  'atom-one-dark' = 'atom-one-dark',
  'github' = 'github',
  'monokai' = 'monokai'
}
