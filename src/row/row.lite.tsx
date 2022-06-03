import { useMetadata } from '@builder.io/mitosis';
import { getBreakpointClasses } from '../../../helpers';
import { BreakpointProps, SharedProps } from '../../../models';
import './row.css';

export type RowProps = {} & SharedProps & BreakpointProps<'row' | 'column' | 'row-reverse' | 'column-reverse'>;

useMetadata({ isAttachedToShadowDom: true });

export default function Row(props: RowProps) {
  return (
    <div
      class={
        'pa-row' +
        getBreakpointClasses(props.xs, props.s, props.m, props.l, props.xl, 'pa-row--') +
        ' ' +
        (props.className || props.class || '')
      }
    >
      {props.children}
    </div>
  );
}
