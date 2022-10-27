export enum Variant {
  Basic = '',
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary'
}

export const variants = Object.entries(Variant).map(([key, value]: [string, string]) => ({ key, value }));
