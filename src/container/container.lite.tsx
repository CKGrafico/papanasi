import { useMetadata } from '@builder.io/mitosis';
import { Children } from '../../../models';
import './container.css';

export type ContainerProps = {
  fluid?: boolean;
  debug?: boolean;
  children?: Children;
};

useMetadata({ isAttachedToShadowDom: true });

export default function Container(props: ContainerProps) {
  return (
    <div class={'pa-container' + (props.fluid ? ' pa-container--fluid' : '') + (props.debug ? ' is-debug' : '')}>
      {props.children}
    </div>
  );
}
