export function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function replaceWhen(source, condition, pattern, replacement) {
  if (!condition) {
    return source;
  }

  return source.replace(pattern, replacement);
}

export function applyConditionalReplacements(source, replacements = []) {
  return replacements.reduce((currentSource, replacement) => {
    const shouldReplace = replacement?.when ?? true;

    if (!shouldReplace) {
      return currentSource;
    }

    return currentSource.replace(replacement.pattern, replacement.replacement);
  }, source);
}
