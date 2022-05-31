import { useMetadata } from '@builder.io/mitosis';
import { SharedProps } from '../../../models';
import './container.css';

export type ContainerProps = {
  fluid?: boolean;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });

export default function Container(props: ContainerProps) {
  return (
    <div
      class={
        'pa-container' + (props.fluid ? ' pa-container--fluid' : '') + ' ' + (props.className || props.class || '')
      }
    >
      {props.children}
    </div>
  );
}
