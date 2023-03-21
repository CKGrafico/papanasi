export enum Breakpoint {
  Basic = 'basic',
  XXS = 'xxs',
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
  XXL = 'xxl'
}

export interface BreakpointProps<T> {
  basic?: T;
  xxs?: T;
  xs?: T;
  s?: T;
  m?: T;
  l?: T;
  xl?: T;
  xxl?: T;
}

export const breakpoints = Object.entries(Breakpoint).map(([key, value]: [string, string]) => ({ key, value }));
