import { onMount, useMetadata, useState } from '@builder.io/mitosis';
import { classesToString } from '../../../helpers';
import { Dynamic, Intent, SharedProps, Variant } from '../../../models';
import './button.css';

export type ButtonProps = {
  variant?: Dynamic<Variant>;
  intent?: Dynamic<Intent>;
  outline?: boolean;
  disabled?: boolean;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });
export default function Button(props: ButtonProps) {
  const state = useState({
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
