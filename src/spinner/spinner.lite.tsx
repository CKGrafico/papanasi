import { onMount, useMetadata, useStore } from '@builder.io/mitosis';
import { classesToString } from '../../../helpers';
import { Dynamic, SharedProps, Variant } from '../../../models';
import './spinner.css';

export type SpinnerProps = {
  variant?: Dynamic<Variant>;
  full?: boolean;
  fullscreen?: boolean;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });
export default function Spinner(props: SpinnerProps) {
  const state = useStore({
    classes: ''
  });

  onMount(() => {
    const setInitialProps = (variant, full, fullscreen, className) => {
      state.classes = classesToString([
        'pa-spinner',
        [variant, `pa-spinner--${variant}`],
        [full && !fullscreen, 'pa-spinner--full'],
        [fullscreen, 'pa-spinner--fullscreen'],
        className || ''
      ]);
    };

    setInitialProps(props.variant, props.full, props.fullscreen, props.className);
  });

  return (
    <div className={state.classes}>
      <svg className="pa-spinner__icon" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle className="pa-spinner__path" fill="none" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>
  );
}
