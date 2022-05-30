import { useMetadata } from '@builder.io/mitosis';
import { getBreakpointClasses } from '../../../helpers';
import { BreakpointProps, Children } from '../../../models';
import './column.css';

export type ColumnProps = {
  debug?: boolean;
  children?: Children;
} & BreakpointProps<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto' | 'hidden'>;

useMetadata({ isAttachedToShadowDom: true });

export default function Column(props: ColumnProps) {
  return (
    <div class={'pa-column' + getBreakpointClasses(props, 'pa-column--') + (props.debug ? ' is-debug' : '')}>
      {props.children}
    </div>
  );
}
