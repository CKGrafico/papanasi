export function replaceClassName(data) {
  return data.replace(/\.className\b/g, '.class').replace(/className(:|")/g, 'class$1');
}
