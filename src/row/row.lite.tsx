import { onMount, useMetadata, useState } from '@builder.io/mitosis';
import { classesToString, getBreakpointClasses } from '../../../helpers';
import { BreakpointProps, SharedProps } from '../../../models';
import './row.css';

export type RowProps = {} & SharedProps & BreakpointProps<'row' | 'column' | 'row-reverse' | 'column-reverse'>;

useMetadata({ isAttachedToShadowDom: true });

export default function Row(props: RowProps) {
  const state = useState({
    classes: '',
    onMounted() {
      function setInitialProps() {
        state.classes = `pa-row ${getBreakpointClasses(props.xs, props.s, props.m, props.l, props.xl, 'pa-row--')} ${
          props.className || ''
        }`;

        state.classes = classesToString([
          'pa-row',
          [getBreakpointClasses(props.xs, props.s, props.m, props.l, props.xl, 'pa-row--')],
          [props.className]
        ]);
      }

      setInitialProps();
    }
  });

  onMount(() => state.onMounted());

  return <div className={state.classes}>{props.children}</div>;
}
