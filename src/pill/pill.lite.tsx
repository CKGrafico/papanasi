import { onMount, useMetadata, useStore } from '@builder.io/mitosis';
import { classesToString } from '../../../helpers';
import './pill.css';
import { PillProps } from './pill.model';

useMetadata({ isAttachedToShadowDom: true });

export default function Pill(props: PillProps) {
  const state = useStore({
    classes: ''
  });

  onMount(() => {
    const setInitialProps = (variant, intent, disabled, className) => {
      state.classes = classesToString([
        'pa-pill',
        [variant, `pa-pill--${variant}`],
        [intent, `is-${intent}`],
        [disabled, 'is-disabled'],
        className || ''
      ]);
    };

    setInitialProps(props.variant, props.intent, props.disabled, props.className);
  });

  return <span className={state.classes}>{props.children}</span>;
}
