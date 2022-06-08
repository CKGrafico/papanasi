import { onMount, useMetadata, useState } from '@builder.io/mitosis';
import { classesToString } from '../../../helpers';
import { SharedProps } from '../../../models';
import './container.css';

export type ContainerProps = {
  fluid?: boolean;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });

export default function Container(props: ContainerProps) {
  const state = useState({
    classes: ''
  });

  onMount(() => {
    function setInitialProps(fluid, className) {
      state.classes = classesToString(['pa-container', [fluid, 'pa-container--fluid'], className]);
    }

    setInitialProps(props.fluid, props.className);
  });

  return <div className={state.classes}>{props.children}</div>;
}
