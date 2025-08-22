import type { BaseProps, BaseState } from '~/models';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends BaseProps {
  items: BreadcrumbItem[];
  separator?: string;
}

export interface BreadcrumbState extends BaseState {
  classes: { base: string };
  separator: string;
}
