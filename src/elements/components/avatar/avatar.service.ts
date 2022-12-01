import { classesToString, debug, randomColor } from '~/helpers';

class AvatarService {
  public getClasses(variant: string, disabled: boolean, className: string) {
    const base = classesToString([
      'pa-avatar',
      [variant, `pa-avatar--${variant}`],
      [disabled, 'is-disabled'],
      className || ''
    ]);

    const container = classesToString(['pa-avatar__container', [variant, `pa-avatar--${variant}`]]);

    debug(`AvatarService getClasses: base: ${base}, container: ${container}`);
    return { base, container };
  }

  public async getStyles(name: string, variant: string) {
    const container = await this.getColor(name, variant);

    debug(`AvatarService getStyles: container: ${JSON.stringify(container)}`);
    return { container };
  }

  public getInitials(name: string) {
    // From: https://stackoverflow.com/a/63763497/3274609
    const initials = name
      .match(/(^\S\S?|\s\S)?/g)
      .map((v) => v.trim())
      .join('')
      .match(/(^\S|\S$)?/g)
      .join('')
      .toLocaleUpperCase();

    debug(`AvatarService getInitials: initials: ${initials}`);
    return initials;
  }

  public async getColor(name: string, variant: string) {
    if (variant) {
      debug(`AvatarService getColor: variant exist: ${variant}`);
      return {};
    }

    const color = await randomColor(name);

    debug(`AvatarService getColor: color: ${JSON.stringify(color)}`);

    return {
      '--pa-avatar-foreground': color.foreground,
      '--pa-avatar-background': color.background
    };
  }

  public getSource(url: string, unavatar: string) {
    const source = unavatar ? `https://unavatar.io/${unavatar}` : url;

    debug(`AvatarService getSource: source: ${source}`);
    return source;
  }
}

export const avatarService = new AvatarService();
