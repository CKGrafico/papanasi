import { onMount, Show, useMetadata, useStore } from '@builder.io/mitosis';
import './column.css';
import type { ColumnProps, ColumnState } from './column.model';
import { columnService } from './column.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Column(props: ColumnProps) {
  const state = useStore<ColumnState>({
    loaded: false,
    classes: { base: '' }
  });

  onMount(() => {
    state.loaded = true;
    state.classes = columnService.getClasses(
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
      <div className={state.classes.base}>{props.children}</div>
    </Show>
  );
}
