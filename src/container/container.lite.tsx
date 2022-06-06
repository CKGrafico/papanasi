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
    classes: '',
    onMounted() {
      function setInitialProps() {
        state.classes = classesToString(['pa-container', [props.fluid, 'pa-container--fluid'], props.className]);
      }

      setInitialProps();
    }
  });

  onMount(() => state.onMounted());

  return <div className={state.classes}>{props.children}</div>;
}
