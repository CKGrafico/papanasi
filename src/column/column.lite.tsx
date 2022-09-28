import { onMount, useMetadata, useStore } from '@builder.io/mitosis';
import { classesToString, getBreakpointClasses } from '../../../helpers';
import './column.css';
import { ColumnProps } from './column.model';

useMetadata({ isAttachedToShadowDom: true });

export default function Column(props: ColumnProps) {
  const state = useStore({
    classes: ''
  });

  onMount(() => {
    const setInitialProps = (xs, s, m, l, xl, class) => {
      state.classes = classesToString([
        'pa-column',
        getBreakpointClasses(xs, s, m, l, xl, 'pa-column--'),
        class || ''
      ]);
    };

    setInitialProps(props.xs, props.s, props.m, props.l, props.xl, props.class);
  });

  return <div class={state.classes}>{props.children}</div>;
}
