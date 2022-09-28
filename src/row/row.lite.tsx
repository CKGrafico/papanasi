import { onMount, useMetadata, useStore } from '@builder.io/mitosis';
import { classesToString, getBreakpointClasses } from '../../../helpers';
import './row.css';
import { RowProps } from './row.model';

useMetadata({ isAttachedToShadowDom: true });

export default function Row(props: RowProps) {
  const state = useStore({
    classes: ''
  });

  onMount(() => {
    const setInitialProps = (xs, s, m, l, xl, class) => {
      state.classes = classesToString(['pa-row', getBreakpointClasses(xs, s, m, l, xl, 'pa-row--'), class || '']);
    };

    setInitialProps(props.xs, props.s, props.m, props.l, props.xl, props.class);
  });

  return <div class={state.classes}>{props.children}</div>;
}
