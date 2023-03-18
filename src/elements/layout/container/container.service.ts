import { classesToString } from '~/helpers';

class ContainerService {
  public getClasses(centered: boolean, fluid: boolean, className: string) {
    const base = classesToString([
      'pa-container',
      [centered, `pa-column--centered`],
      [fluid, 'pa-container--fluid'],
      className || ''
    ]);

    return { base };
  }
}

export const containerService = new ContainerService();
