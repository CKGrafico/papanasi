import { onMount, Show, useMetadata, useStore } from '@builder.io/mitosis';
import './row.css';
import type { RowProps, RowState } from './row.model';
import { rowService } from './row.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Row(props: RowProps) {
  const state = useStore<RowState>({
    loaded: false,
    classes: { base: '' }
  });

  onMount(() => {
    state.loaded = true;
    state.classes = rowService.getClasses(
      props.basic,
      props.xxs,
      props.xs,
      props.s,
      props.m,
      props.l,
      props.xl,
      props.xxl,
      props.className
    );
  });

  return (
    <Show when={state.loaded}>
      <div class={state.classes.base}>{props.children}</div>
    </Show>
  );
}
