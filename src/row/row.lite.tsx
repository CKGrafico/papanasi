import { useMetadata } from '@builder.io/mitosis';
import { Breakpoint, BreakpointProps, breakpoints } from '../../../models';
import './row.css';

export type RowProps = {
  column?: boolean;
  debug?: boolean;
  children?: any; // TODO change
} & BreakpointProps<'row' | 'column' | 'row-reverse' | 'column-reverse'>;

useMetadata({ isAttachedToShadowDom: true });

export default function Row(props: RowProps) {
  // Move to helper
  // use constants for directions
  function getBreakpointClasses(props) {
    const usedBreakpoints = Object.entries(props).filter(([key]: [Breakpoint, string]) =>
      breakpoints.find((x) => x.value === key)
    );

    const breakpointsClasses = usedBreakpoints.map(
      ([key, value]: [Breakpoint, string]) => 'pa-row--' + value + '@' + key
    );

    return ' ' + breakpointsClasses.join(' ');
  }

  return <div class={'pa-row' + getBreakpointClasses(props) + (props.debug ? ' is-debug' : '')}>{props.children}</div>;
}
