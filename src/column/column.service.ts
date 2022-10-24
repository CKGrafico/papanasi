import { classesToString, getBreakpointClasses } from '~/helpers';

class ColumnService {
  public getClasses(
    basic: number | string,
    xxs: number | string,
    xs: number | string,
    s: number | string,
    m: number | string,
    l: number | string,
    xl: number | string,
    xxl: number | string,
    className: string
  ) {
    const base = classesToString([
      'pa-column',
      getBreakpointClasses(basic, xxs, xs, s, m, l, xl, xxl, 'pa-column--'),
      className || ''
    ]);

    return { base };
  }
}

export const columnService = new ColumnService();
