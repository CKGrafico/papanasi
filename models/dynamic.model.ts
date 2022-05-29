// We don't want to limit the user to use only our types

export type Dynamic<T> = T & { [key: string]: string };
