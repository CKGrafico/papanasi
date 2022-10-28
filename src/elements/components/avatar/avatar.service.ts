import { classesToString, randomColor } from '~/helpers';

class AvatarService {
  public getClasses(variant: string, disabled: boolean, className: string) {
    const base = classesToString([
      'pa-avatar',
      [variant, `pa-avatar--${variant}`],
      [disabled, 'is-disabled'],
      className || ''
    ]);

    const container = classesToString(['pa-avatar__container', [variant, `pa-avatar--${variant}`]]);

    return { base, container };
  }

  public async getStyles(name: string, variant: string) {
    const container = await this.getColor(name, variant);

    return { container };
  }

  public getInitials(name: string) {
    // From: https://stackoverflow.com/a/63763497/3274609
    return name
      .match(/(^\S\S?|\s\S)?/g)
      .map((v) => v.trim())
      .join('')
      .match(/(^\S|\S$)?/g)
      .join('')
      .toLocaleUpperCase();
  }

  public async getColor(name: string, variant: string) {
    if (variant) {
      return {};
    }

    const color = await randomColor(name);

    return {
      color: color.foreground,
      backgroundColor: color.background
    };
  }

  public getSource(url: string, unavatar: string) {
    return unavatar ? `https://unavatar.io/${unavatar}` : url;
  }
}

export const avatarService = new AvatarService();
