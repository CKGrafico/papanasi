import { classesToString, getBreakpointClasses } from '../../../helpers';

class ColumnService {
  public getClasses(xs: string, s: string, m: string, l: string, xl: string, className: string) {
    const base = classesToString(['pa-column', getBreakpointClasses(xs, s, m, l, xl, 'pa-column--'), className || '']);

    return { base };
  }
}

export const columnService = new ColumnService();
