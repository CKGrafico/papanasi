import { classesToString, getBreakpointClasses } from '~/helpers';

class RowService {
  public getClasses(xs: string, s: string, m: string, l: string, xl: string, className: string) {
    const base = classesToString(['pa-row', getBreakpointClasses(xs, s, m, l, xl, 'pa-row--'), className || '']);

    return { base };
  }
}

export const rowService = new RowService();
