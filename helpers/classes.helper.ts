export function classesToString(classes: (string | [boolean, string])[]): string {
  let stringWithClasses = '';

  classes.map((className) => {
    if (Array.isArray(className) && className[0]) {
      stringWithClasses += ` ${className[1]}`;
    }

    if (!Array.isArray(className)) {
      stringWithClasses += ` ${className}`;
    }
  });

  return stringWithClasses;
}
