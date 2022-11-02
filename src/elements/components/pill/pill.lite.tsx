import { onMount, Show, useMetadata, useStore } from '@builder.io/mitosis';
import './pill.css';
import type { PillProps, PillState } from './pill.model';
import { pillService } from './pill.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Pill(props: PillProps) {
  const state = useStore<PillState>({
    loaded: false,
    classes: { base: '' }
  });

  onMount(() => {
    state.loaded = true;
    state.classes = pillService.getClasses(
      props.variant,
      props.intent,
      props.disabled,
      props.className || props.classList
    );
  });

  return (
    <Show when={state.loaded}>
      <span class={state.classes.base}>{props.children}</span>
    </Show>
  );
}
