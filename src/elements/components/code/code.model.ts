import { CodeJar } from '~/helpers';
import type { BaseProps, BaseState, Children } from '~/models';

export interface ICodeService {
  styles: HTMLLinkElement[];
  jar: CodeJar;
  currentThemeIndex: number;
  hljs: any;
  getClasses(language: string, className: string): { base: string; editor: string };
  initialize(codeRef: HTMLElement, language: string, theme: CodeTheme): Promise<void>;
  destroy(): void;
  update(code: string): void;
  onUpdate(callback: (code: string) => void): void;
  setEditable(codeRef: HTMLElement, editable: boolean): Promise<void>;
  copy(code: string): Promise<void>;
}

export type CodeLink = { label: string; url: string; icon: string };

export interface CodeProps extends BaseProps {
  editable?: boolean;
  language: string;
  theme: CodeTheme;
  code: string;
  disableCopy?: boolean;
  slotCopy?: Children;
  links?: CodeLink[];
  onUpdate?: (code: string) => void;
}

export interface CodeState extends BaseState {
  classes: { base: string; editor: string };
  codeService: ICodeService;
  value: <T>(x: T, y: string) => string;
}

export const codeThemes = ['default', 'dark', 'atom-one-light', 'atom-one-dark', 'github', 'monokai'] as const;

export type CodeTheme = (typeof codeThemes)[number];
