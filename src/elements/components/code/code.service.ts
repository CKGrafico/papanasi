import { classesToString, CodeJar, codeLanguages, debug, injectCodeCore, wait } from '~/helpers';
import type { CodeTheme, ICodeService } from './code.model';
import { codeThemes } from './code.model';

export class CodeService implements ICodeService {
  public styles: HTMLLinkElement[];
  public jar: CodeJar;
  public currentThemeIndex: number;
  public hljs;

  constructor() {
    this.styles = [];
    this.jar = null;
    this.currentThemeIndex = 0;
    this.hljs = null;
  }

  public getClasses(language: string, className: string) {
    const base = classesToString(['pa-code', className || '']);
    const editor = classesToString(['pa-code__editor', [language, `language-${language}`]]);

    debug(`CodeService getClasses: base: ${base}, editor: ${editor}`);
    return { base, editor };
  }

  public async initialize(codeRef, language: string, theme: CodeTheme) {
    this.hljs = await injectCodeCore();
    this.jar = CodeJar(codeRef, (editor: HTMLElement) => {
      if (!editor.innerText) {
        return;
      }

      this.registerLanguage(language);
      this.highlightCode(editor);
    });

    debug(`CodeService initialize: language: ${language}, theme: ${theme}`);

    this.hljs.configure({
      ignoreUnescapedHTML: true
    });

    this.registerThemes();
    this.updateCurrentTheme(theme);

    debug(`CodeService initialize: hljs and themes registered`);
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
    const copy = ((await import('copy-to-clipboard')) as any).default;
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

  private registerLanguage(language: string) {
    if (language === 'javascript' || language === 'typescript') {
      this.hljs.registerLanguage('xml', codeLanguages['xml']);
    }

    this.hljs.registerLanguage(language, codeLanguages[language]);
    debug(`CodeService registerLanguage: language: ${language}`);
  }

  private highlightCode(editor: HTMLElement) {
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
