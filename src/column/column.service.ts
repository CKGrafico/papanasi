import { classesToString, getBreakpointClasses } from '~/helpers';

class ColumnService {
  public getClasses(
    xs: number | string,
    s: number | string,
    m: number | string,
    l: number | string,
    xl: number | string,
    className: string
  ) {
    const base = classesToString(['pa-column', getBreakpointClasses(xs, s, m, l, xl, 'pa-column--'), className || '']);

    return { base };
  }
}

export const columnService = new ColumnService();
