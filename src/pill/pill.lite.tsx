import { useMetadata } from '@builder.io/mitosis';
import './pill.css';

export type PillProps = {
  variant?: string;
  children?: any; // TODO change
};

useMetadata({ isAttachedToShadowDom: true });

export default function Pill(props: PillProps) {
  return <span class={'pa-pill' + (props.variant ? ' pa-pill--' + props.variant : '')}>{props.children}</span>;
}
