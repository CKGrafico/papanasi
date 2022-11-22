import cssLanguage from 'highlight.js/lib/languages/css';
import jsLanguage from 'highlight.js/lib/languages/javascript';
import markdownLanguage from 'highlight.js/lib/languages/markdown';
import tsLanguage from 'highlight.js/lib/languages/typescript';
import xmlLanguage from 'highlight.js/lib/languages/xml';

export const codeLanguages = {
  javascript: jsLanguage,
  typescript: tsLanguage,
  css: cssLanguage,
  xml: xmlLanguage,
  markdown: markdownLanguage
};

export const injectCodeCore = async () => (await import('highlight.js/lib/core')).default;

export function addCodeLanguage(name: string, language) {
  codeLanguages[name] = language;
}
