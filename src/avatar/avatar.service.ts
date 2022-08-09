class AvatarService {
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
}

export const avatarService = new AvatarService();
