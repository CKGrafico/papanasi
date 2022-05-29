export enum Variant {
  Basic = '',
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary'
}

export type DynamicVariant = Variant & { [key: string]: string };

export const variants = Object.entries(Variant).map(([key, value]: [string, string]) => ({ key, value }));
