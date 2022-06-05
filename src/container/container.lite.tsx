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
    onMount() {
      function setInitialProps() {
        state.classes = classesToString([
          'pa-container',
          [props.fluid, 'pa-container--fluid'],
          [props.className || props.class]
        ]);
      }

      setInitialProps();
    }
  });

  onMount(() => state.onMount());

  return <div class={state.classes}>{props.children}</div>;
}
