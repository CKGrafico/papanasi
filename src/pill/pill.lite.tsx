import { onMount, useMetadata, useState } from '@builder.io/mitosis';
import { classesToString } from '../../../helpers';
import { Dynamic, Intent, SharedProps, Variant } from '../../../models';
import './pill.css';

export type PillProps = {
  variant?: Dynamic<Variant>;
  intent?: Dynamic<Intent>;
  disabled?: boolean;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });

export default function Pill(props: PillProps) {
  const state = useState({
    classes: '',
    onMounted() {
      function setInitialProps() {
        state.classes = classesToString([
          'pa-pill',
          [props.variant, `pa-pill--${props.variant}`],
          [props.intent, `is-${props.intent}`],
          [props.disabled, 'is-disabled'],
          props.className
        ]);
      }

      setInitialProps();
    }
  });

  onMount(() => state.onMounted());

  return <span className={state.classes}>{props.children}</span>;
}
