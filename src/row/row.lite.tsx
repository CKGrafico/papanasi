import { useMetadata } from '@builder.io/mitosis';
import { getBreakpointClasses } from '../../../helpers';
import { BreakpointProps, Children } from '../../../models';
import './row.css';

export type RowProps = {
  column?: boolean;
  debug?: boolean;
  children?: Children;
} & BreakpointProps<'row' | 'column' | 'row-reverse' | 'column-reverse'>;

useMetadata({ isAttachedToShadowDom: true });

export default function Row(props: RowProps) {
  return (
    <div class={'pa-row' + getBreakpointClasses(props, 'pa-row--') + (props.debug ? ' is-debug' : '')}>
      {props.children}
    </div>
  );
}
