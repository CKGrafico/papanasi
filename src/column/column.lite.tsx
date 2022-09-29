import { onMount, Show, useMetadata, useStore } from '@builder.io/mitosis';
import './column.css';
import { ColumnProps, ColumnState } from './column.model';
import { columnService } from './column.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Column(props: ColumnProps) {
  const state = useStore<ColumnState>({
    loaded: false,
    classes: ''
  });

  onMount(() => {
    state.loaded = true;
    state.classes = columnService.getClasses(props.xs, props.s, props.m, props.l, props.xl, props.className);
  });

  return (
    <Show when={state.loaded}>
      <div className={state.classes.base}>{props.children}</div>
    </Show>
  );
}
