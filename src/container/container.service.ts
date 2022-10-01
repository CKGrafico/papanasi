import { classesToString } from '~/helpers';

class ContainerService {
  public getClasses(fluid: boolean, className: string) {
    const base = classesToString(['pa-container', [fluid, 'pa-container--fluid'], className || '']);

    return { base };
  }
}

export const containerService = new ContainerService();
