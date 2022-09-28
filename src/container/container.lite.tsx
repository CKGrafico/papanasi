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
    const setInitialProps = (fluid, className) => {
      state.classes = classesToString(['pa-container', [fluid, 'pa-container--fluid'], className || '']);
    };

    setInitialProps(props.fluid, props.className);
  });

  return <div className={state.classes}>{props.children}</div>;
}
