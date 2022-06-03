import { onMount, useMetadata, useState } from '@builder.io/mitosis';
import { getBreakpointClasses } from '../../../helpers';
import { BreakpointProps, SharedProps } from '../../../models';
import './row.css';

export type RowProps = {} & SharedProps & BreakpointProps<'row' | 'column' | 'row-reverse' | 'column-reverse'>;

useMetadata({ isAttachedToShadowDom: true });

export default function Row(props: RowProps) {
  const state = useState({
    classes: '',
    onMount() {
      state.classes = `pa-row ${getBreakpointClasses(props.xs, props.s, props.m, props.l, props.xl, 'pa-row--')} ${
        props.className || props.class || ''
      }`;
    }
  });

  onMount(() => state.onMount());

  return <div class={state.classes}>{props.children}</div>;
}
