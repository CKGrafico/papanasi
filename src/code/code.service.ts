import { CodeJar } from 'codejar';
import hljs from 'highlight.js/lib/core';
import { classesToString, wait } from '~/helpers';
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

    hljs.configure({
      ignoreUnescapedHTML: true
    });

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

  public async setEditable(codeRef, editable: boolean) {
    await wait();
    codeRef.setAttribute('contenteditable', editable ? 'plaintext-only' : 'false');
  }

  private registerLanguage(language: string) {
    // Highlight does not support those types
    if (language === 'jsx') {
      hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
      hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

      return;
    }

    if (language === 'tsx') {
      hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
      hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));

      return;
    }

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
    hljs.highlightElement(editor);
  }
}

export const codeService = new CodeService();
