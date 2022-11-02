import { onMount, Show, useMetadata, useStore } from '@builder.io/mitosis';
import './spinner.css';
import type { SpinnerProps, SpinnerState } from './spinner.model';
import { spinnerService } from './spinner.service';

useMetadata({ isAttachedToShadowDom: true });
export default function Spinner(props: SpinnerProps) {
  const state = useStore<SpinnerState>({
    loaded: false,
    classes: { base: '' }
  });

  onMount(() => {
    state.loaded = true;
    state.classes = spinnerService.getClasses(
      props.variant,
      props.full,
      props.fullscreen,
      props.className || props.classList
    );
  });

  return (
    <Show when={state.loaded}>
      <div class={state.classes.base}>
        <svg class="pa-spinner__icon" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle class="pa-spinner__path" fill="none" cx="33" cy="33" r="30"></circle>
        </svg>
      </div>
    </Show>
  );
}
