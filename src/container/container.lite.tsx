import { useMetadata } from '@builder.io/mitosis';
import './container.css';

export type ContainerProps = {
  fluid?: boolean;
  debug?: boolean;
  children?: any; // TODO change
};

useMetadata({ isAttachedToShadowDom: true });

export default function Container(props: ContainerProps) {
  return (
    <div class={'pa-container' + (props.fluid ? ' pa-container--fluid' : '') + (props.debug ? ' is-debug' : '')}>
      {props.children}
    </div>
  );
}
