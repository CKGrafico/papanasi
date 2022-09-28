import { onMount, useMetadata, useStore } from '@builder.io/mitosis';
import { classesToString } from '../../../helpers';
import './button.css';
import { ButtonProps } from './button.model';

useMetadata({ isAttachedToShadowDom: true });
export default function Button(props: ButtonProps) {
  const state = useStore({
    classes: ''
  });

  onMount(() => {
    const setInitialProps = (variant, outline, intent, disabled, className) => {
      state.classes = classesToString([
        'pa-button',
        [variant, `pa-button--${variant}`],
        [outline, 'pa-button--outline'],
        [intent, `is-${intent}`],
        [disabled, 'is-disabled'],
        className || ''
      ]);
    };

    setInitialProps(props.variant, props.outline, props.intent, props.disabled, props.className);
  });

  return <button className={state.classes}>{props.children}</button>;
}
