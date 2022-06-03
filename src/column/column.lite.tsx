import { useMetadata } from '@builder.io/mitosis';
import { getBreakpointClasses } from '../../../helpers';
import { BreakpointProps, SharedProps } from '../../../models';
import './column.css';

export type ColumnProps = {} & SharedProps &
  BreakpointProps<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'content' | 'fill' | 'hide'>;

useMetadata({ isAttachedToShadowDom: true });

export default function Column(props: ColumnProps) {
  return (
    <div
      class={
        'pa-column' +
        getBreakpointClasses(props.xs, props.s, props.m, props.l, props.xl, 'pa-column--') +
        ' ' +
        (props.className || props.class || '')
      }
    >
      {props.children}
    </div>
  );
}
