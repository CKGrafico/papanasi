import { onMount, Show, useMetadata, useState } from '@builder.io/mitosis';
import { classesToString } from '../../../helpers';
import { Children, Dynamic, Intent, SharedProps, Variant } from '../../../models';
import './tab.css';

export type TabProps = {
  isActive?: boolean;
  variant?: Dynamic<Variant>;
  slotTitle: Children;
  intent?: Dynamic<Intent>;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });

export default function Tab(props: TabProps) {
  const state = useState({
    classes: ''
  });

  onMount(() => {
    const setInitialProps = (variant, intent, isActive, className) => {
      state.classes = classesToString([
        'pa-tab',
        [variant, `pa-tab--${variant}`],
        [intent, `is-${intent}`],
        [isActive, `is-active`],
        className || ''
      ]);
    };

    setInitialProps(props.variant, props.intent, props.isActive, props.className);
  });

  return (
    <div className={state.classes}>
      <div className="pa-tab__title">{props.slotTitle}</div>
      <Show when={props.isActive}>
        <div className="pa-tab__content">{props.children}</div>
      </Show>
    </div>
  );
}
