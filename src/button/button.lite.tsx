import { useMetadata } from '@builder.io/mitosis';
import './button.css';

export type ButtonProps = {
  variant?: string;
  outline?: boolean;
  disabled?: boolean;
  children?: any; // TODO change
};

useMetadata({ isAttachedToShadowDom: true });

export default function Button(props: ButtonProps) {
  return (
    <button
      class={
        'pa-button' +
        (props.variant ? ' pa-button--' + props.variant : '') +
        (props.outline ? ' pa-button--outline' : '') +
        (props.disabled ? ' is-disabled' : '')
      }
    >
      {props.children}
    </button>
  );
}
