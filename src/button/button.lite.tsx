import { onMount, Show, useMetadata, useStore } from '@builder.io/mitosis';
import './button.css';
import { ButtonProps, ButtonState } from './button.model';
import { buttonService } from './button.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Button(props: ButtonProps) {
  const state = useStore<ButtonState>({
    loaded: false,
    classes: { base: '' }
  });

  onMount(() => {
    state.loaded = true;
    state.classes = buttonService.getClasses(
      props.variant,
      props.outline,
      props.intent,
      props.disabled,
      props.className
    );
  });

  return (
    <Show when={state.loaded}>
      <button class={state.classes.base}>{props.children}</button>
    </Show>
  );
}
