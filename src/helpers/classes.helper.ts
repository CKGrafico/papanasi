export type ClassValue = string | [string | boolean | null | undefined, string] | null | undefined | false;

export function classesToString(classes: ClassValue[]): string {
  let stringWithClasses = '';

  classes.forEach((className) => {
    if (Array.isArray(className)) {
      if (className[0]) {
        stringWithClasses += ` ${className[1]}`;
      }
      return;
    }

    if (className) {
      stringWithClasses += ` ${className}`;
    }
  });

  return stringWithClasses;
}
