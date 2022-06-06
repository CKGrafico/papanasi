// TODO: Angular problems typing here
export function classesToString(classes: (string | any)[]): string {
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
