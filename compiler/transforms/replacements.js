import { applyConditionalReplacements } from './text.js';

export function replaceClassNameMemberAccess(data) {
  return data.replace(/\.className\b/g, '.class');
}

export function replaceClassNameAttribute(data) {
  return data.replace(/\bclassName(?=\s*[:=])/g, 'class');
}

export function replaceClassName(data) {
  return applyConditionalReplacements(data, [
    {
      pattern: /\.className\b/g,
      replacement: '.class'
    },
    {
      pattern: /\bclassName(?=\s*[:=])/g,
      replacement: 'class'
    }
  ]);
}
