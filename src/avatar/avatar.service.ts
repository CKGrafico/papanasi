import { classesToString, randomColor } from '../../../helpers';
import { AvatarProps } from './avatar.model';

class AvatarService {
  public getClasses({ variant, disabled, className }: AvatarProps) {
    const classes = classesToString([
      'pa-avatar',
      [variant, `pa-avatar--${variant}`],
      [disabled, 'is-disabled'],
      className || ''
    ]);

    const containerClasses = classesToString(['pa-avatar__container', [variant, `pa-avatar--${variant}`]]);

    return { classes, containerClasses };
  }

  public getInitials({ name }: AvatarProps) {
    // From: https://stackoverflow.com/a/63763497/3274609
    return name
      .match(/(^\S\S?|\s\S)?/g)
      .map((v) => v.trim())
      .join('')
      .match(/(^\S|\S$)?/g)
      .join('')
      .toLocaleUpperCase();
  }

  public getColor({ name, variant }: AvatarProps) {
    if (variant) {
      return {};
    }

    const color = randomColor(name);

    return {
      color: color.foreground,
      backgroundColor: color.background
    };
  }

  public getSource({ url, unavatar }: AvatarProps) {
    return unavatar ? `https://unavatar.io/${unavatar}` : url;
  }
}

export const avatarService = new AvatarService();
