import { For, Show, useMetadata, useStore } from '@builder.io/mitosis';
import './breadcrumb.css';
import type { BreadcrumbProps, BreadcrumbState } from './breadcrumb.model';
import { breadcrumbService } from './breadcrumb.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Breadcrumb(props: BreadcrumbProps) {
  const state = useStore<BreadcrumbState>({
    get classes() {
      return breadcrumbService.getClasses(props.className || props.classList);
    },
    get separator() {
      return props.separator || '/';
    }
  });

  return (
    <nav class={state.classes.base} aria-label="breadcrumb">
      <ol class="pa-breadcrumb__list">
        <For each={props.items}>
          {(item, index) => (
            <li class="pa-breadcrumb__item">
              <Show when={item.href}>
                <a class="pa-breadcrumb__link" href={item.href}>
                  {item.label}
                </a>
              </Show>
              <Show when={!item.href}>
                <span class="pa-breadcrumb__link">{item.label}</span>
              </Show>
              <Show when={index !== props.items.length - 1}>
                <span class="pa-breadcrumb__separator">{state.separator}</span>
              </Show>
            </li>
          )}
        </For>
      </ol>
    </nav>
  );
}
