import type { BaseProps, BaseState, Children } from '~/models';
import { CodeService } from './code.service';

export type CodeProps = {
  editable?: boolean;
  language: string;
  theme: CodeTheme;
  code: string;
  disableCopy?: boolean;
  slotCopy?: Children;
  links?: { label: string; url: string; icon: string }[];
  onUpdate?: (code: string) => void;
} & BaseProps;

export type CodeState = {
  classes: { base: string; editor: string };
  codeService: CodeService;
  value: <T>(x: T, y: string) => string;
} & BaseState;

export const codeThemes = ['default', 'dark', 'atom-one-light', 'atom-one-dark', 'github', 'monokai'] as const;

export type CodeTheme = typeof codeThemes[number];
