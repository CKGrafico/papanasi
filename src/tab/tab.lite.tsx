import { onMount, useMetadata, useState } from '@builder.io/mitosis';
import { classesToString } from '../../../helpers';
import { Dynamic, Intent, SharedProps, Variant } from '../../../models';
import './tab.css';

export type TabProps = {
  variant?: Dynamic<Variant>;
  intent?: Dynamic<Intent>;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });

export default function Tab(props: TabProps) {
  const state = useState({
    classes: ''
  });

  onMount(() => {
    const setInitialProps = (variant, intent, className) => {
      state.classes = classesToString([
        'pa-tab',
        [variant, `pa-tab--${variant}`],
        [intent, `is-${intent}`],
        className || ''
      ]);
    };

    setInitialProps(props.variant, props.intent, props.className);
  });

  return <div className={state.classes}>{props.children}</div>;
}
