import { CodeJar } from 'codejar';
import hljs from 'highlight.js/lib/core';
import { classesToString } from '~/helpers';
import { CodeTheme, codeThemes } from './code.model';

let styles = [];

class CodeService {
  public jar: CodeJar;
  public currentThemeIndex = 0;

  public getClasses(language: string, className: string) {
    const base = classesToString(['pa-code', className || '']);
    const editor = classesToString(['pa-code__editor', [language, `language-${language}`]]);

    return { base, editor };
  }

  public initialize(codeRef, code: string, language: string, theme: CodeTheme) {
    this.jar = CodeJar(codeRef, this.highlightCode);

    this.registerLanguage(language);
    this.registerThemes();
    this.updateCurrentTheme(theme);
    this.update(code);
  }

  public destroy() {
    this.jar.destroy();
  }

  public update(code: string) {
    this.jar.updateCode(code);
  }

  public onUpdate(callback: (code: string) => void) {
    this.jar.onUpdate(callback);
  }

  private registerLanguage(language: string) {
    hljs.registerLanguage(language, require('highlight.js/lib/languages/' + language));
  }

  private registerThemes() {
    if (styles?.length > 0) {
      return;
    }

    styles = codeThemes.map((name) => {
      const link = document.createElement('link');
      link.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/${name}.min.css`;
      link.rel = 'stylesheet';
      link.disabled = true;
      document.head.appendChild(link);
      return link;
    });
  }

  private updateCurrentTheme(theme: CodeTheme) {
    styles[this.currentThemeIndex].setAttribute('disabled', 'true');

    this.currentThemeIndex = styles.findIndex((style) => style.href.includes(theme));
    styles[this.currentThemeIndex].removeAttribute('disabled');
  }

  private highlightCode(editor: HTMLElement) {
    editor.textContent = editor.textContent;
    hljs.highlightElement(editor);
  }
}

export const codeService = new CodeService();
