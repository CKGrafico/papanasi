import { onMount, useMetadata, useState } from '@builder.io/mitosis';
import { classesToString } from '../../../helpers';
import { SharedProps } from '../../../models';
import './tabs.css';

export type TabsProps = SharedProps;

useMetadata({ isAttachedToShadowDom: true });

export default function Tabs(props: TabsProps) {
  const state = useState({
    classes: '',
    tabs: null
  });

  onMount(() => {
    const setInitialProps = (className) => {
      state.classes = classesToString(['pa-tabs', className || '']);
    };

    setInitialProps(props.className);
  });

  return (
    <div role="tablist" className={state.classes}>
      {props.children}
    </div>
  );
}
