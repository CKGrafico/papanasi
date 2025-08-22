import { classesToString, debug } from '~/helpers';

class BreadcrumbService {
  public getClasses(className: string) {
    const base = classesToString(['pa-breadcrumb', className || '']);

    debug(`BreadcrumbService getClasses: base: ${base}`);
    return { base };
  }
}

export const breadcrumbService = new BreadcrumbService();
