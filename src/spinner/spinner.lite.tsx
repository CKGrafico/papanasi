import { onMount, useMetadata, useStore } from '@builder.io/mitosis';
import { classesToString } from '../../../helpers';
import './spinner.css';
import { SpinnerProps } from './spinner.model';

useMetadata({ isAttachedToShadowDom: true });
export default function Spinner(props: SpinnerProps) {
  const state = useStore({
    classes: ''
  });

  onMount(() => {
    const setInitialProps = (variant, full, fullscreen, class) => {
      state.classes = classesToString([
        'pa-spinner',
        [variant, `pa-spinner--${variant}`],
        [full && !fullscreen, 'pa-spinner--full'],
        [fullscreen, 'pa-spinner--fullscreen'],
        class || ''
      ]);
    };

    setInitialProps(props.variant, props.full, props.fullscreen, props.class);
  });

  return (
    <div class={state.classes}>
      <svg class="pa-spinner__icon" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="pa-spinner__path" fill="none" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>
  );
}
