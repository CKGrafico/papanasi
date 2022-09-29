import { onMount, Show, useMetadata, useStore } from '@builder.io/mitosis';
import './container.css';
import { ContainerProps, ContainerState } from './container.model';
import { containerService } from './container.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Container(props: ContainerProps) {
  const state = useStore<ContainerState>({
    loaded: false,
    classes: ''
  });

  onMount(() => {
    state.loaded = true;
    state.classes = containerService.getClasses(props.fluid, props.className);
  });

  return (
    <Show when={state.loaded}>
      <div class={state.classes.base}>{props.children}</div>;
    </Show>
  );
}
