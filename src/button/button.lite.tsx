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
    classes: '',
    onMount() {
      function setInitialProps() {
        state.classes = classesToString([
          'pa-button',
          [props.variant, `pa-button--${props.variant}`],
          [props.outline, 'pa-button--outline'],
          [props.intent, `is-${props.intent}`],
          [props.disabled, 'is-disabled'],
          [props.className]
        ]);
      }

      setInitialProps();
    }
  });

  onMount(() => state.onMount());

  return <button className={state.classes}>{props.children}</button>;
}
