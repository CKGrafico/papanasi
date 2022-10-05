export enum Breakpoint {
  XXS = 'xxs',
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
  XXL = 'xxl'
}

export type BreakpointProps<T> = {
  [key in Breakpoint]?: T;
};

export const breakpoints = Object.entries(Breakpoint).map(([key, value]: [string, string]) => ({ key, value }));
