import { classesToString, getBreakpointClasses } from '~/helpers';

class RowService {
  public getClasses(
    basic: string,
    xxs: string,
    xs: string,
    s: string,
    m: string,
    l: string,
    xl: string,
    xxl: string,
    className: string
  ) {
    const base = classesToString([
      'pa-row',
      getBreakpointClasses(basic, xxs, xs, s, m, l, xl, xxl, 'pa-row--'),
      className || ''
    ]);

    return { base };
  }
}

export const rowService = new RowService();
