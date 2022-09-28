import { onMount, useMetadata, useStore } from '@builder.io/mitosis';
import { classesToString } from '../../../helpers';
import './container.css';
import { ContainerProps } from './container.model';

useMetadata({ isAttachedToShadowDom: true });

export default function Container(props: ContainerProps) {
  const state = useStore({
    classes: ''
  });

  onMount(() => {
    const setInitialProps = (fluid, class) => {
      state.classes = classesToString(['pa-container', [fluid, 'pa-container--fluid'], class || '']);
    };

    setInitialProps(props.fluid, props.class);
  });

  return <div class={state.classes}>{props.children}</div>;
}
