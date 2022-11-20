import Copy from 'copy-to-clipboard';
import HighlightCore from 'highlight.js/lib/core';
import 'highlight.js/lib/languages/css';
import 'highlight.js/lib/languages/javascript';
import 'highlight.js/lib/languages/typescript';
import 'highlight.js/lib/languages/xml';
import { classesToString, CodeJar, debug, wait } from '~/helpers';
import type { CodeTheme } from './code.model';
import { codeThemes } from './code.model';

export class CodeService {
  public styles: HTMLLinkElement[];
  public jar: CodeJar;
  public hljs;
  public currentThemeIndex: number;

  constructor() {
    this.styles = [];
    this.currentThemeIndex = 0;
  }

  public getClasses(language: string, className: string) {
    const base = classesToString(['pa-code', className || '']);
    const editor = classesToString(['pa-code__editor', [language, `language-${language}`]]);

    debug(`CodeService getClasses: base: ${base}, editor: ${editor}`);
    return { base, editor };
  }

  public async initialize(codeRef, language: string, theme: CodeTheme, callback: () => void) {
    this.hljs = HighlightCore;
    this.jar = CodeJar(codeRef, (editor: HTMLElement) => this.highlightCode(editor));

    debug(`CodeService initialize: language: ${language}, theme: ${theme}`);

    this.hljs.configure({
      ignoreUnescapedHTML: true
    });

    this.registerThemes();
    this.updateCurrentTheme(theme);

    debug(`CodeService initialize: hljs and themes registered`);
    callback();
  }

  public destroy() {
    debug(`CodeService destroy: hljs and themes unregistered`);
    this.jar.destroy();
  }

  public update(code: string) {
    debug(`CodeService update: code: ${code}`);
    this.jar.updateCode(code);
  }

  public onUpdate(callback: (code: string) => void) {
    debug(`CodeService onUpdate: callback: ${callback}`);
    this.jar.onUpdate(callback);
  }

  public async setEditable(codeRef, editable: boolean) {
    await wait();
    debug(`CodeService setEditable: editable: ${editable}`);
    codeRef.setAttribute('contenteditable', editable ? 'plaintext-only' : 'false');
  }

  public async copy(code: string) {
    const copy = Copy;
    debug(`CodeService copy: code: ${code}`);
    copy(code);
  }

  private registerThemes() {
    if (this.styles?.length > 0) {
      return;
    }

    this.styles = codeThemes.map((name) => {
      const link = document.createElement('link');
      link.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/${name}.min.css`;
      link.rel = 'stylesheet';
      link.disabled = true;
      document.head.appendChild(link);

      debug(`CodeService registerThemes: theme: ${name}`);

      return link;
    });
  }

  private updateCurrentTheme(theme: CodeTheme) {
    this.styles[this.currentThemeIndex].setAttribute('disabled', 'true');

    this.currentThemeIndex = this.styles.findIndex((style) => style.href.includes(theme));
    this.styles[this.currentThemeIndex].removeAttribute('disabled');
    debug(`CodeService updateCurrentTheme: theme: ${theme}`);
  }

  private highlightCode(editor: HTMLElement) {
    debugger;
    this.hljs.highlightElement(editor);

    // Show colors in css
    if (!editor.classList.contains('language-css')) {
      return;
    }

    debug(`CodeService highlightCode enabled`);
    editor.querySelectorAll('.hljs-number').forEach((element) => {
      element.setAttribute('style', `--number-color: ${element.textContent}`);
    });
  }
}
