import { onMount, useMetadata, useState } from '@builder.io/mitosis';
import { classesToString } from '../../../helpers';
import { Dynamic, Intent, SharedProps, Variant } from '../../../models';
import './tabs.css';

export type TabsProps = {
  variant?: Dynamic<Variant>;
  intent?: Dynamic<Intent>;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });

export default function Tabs(props: TabsProps) {
  const state = useState({
    classes: '',
    childrenTabs: null
  });

  onMount(() => {
    const setInitialProps = (variant, intent, className) => {
      state.classes = classesToString([
        'pa-tabs',
        [variant, `pa-tabs--${variant}`],
        [intent, `is-${intent}`],
        className || ''
      ]);
    };

    const setConfiguredChildrenTabs = (children) => {
      console.log(children[0], children[0].type.name);
      state.childrenTabs = children;
    };

    setInitialProps(props.variant, props.intent, props.className);
    setConfiguredChildrenTabs(props.children);
  });

  return (
    <div role="tablist" className={state.classes}>
      {props.children && state.childrenTabs ? <>{state.childrenTabs}</> : <></>}
    </div>
  );
}
