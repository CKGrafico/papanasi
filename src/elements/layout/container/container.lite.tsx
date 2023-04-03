import { useMetadata, useStore } from '@builder.io/mitosis';
import './container.css';
import type { ContainerProps, ContainerState } from './container.model';
import { containerService } from './container.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Container(props: ContainerProps) {
  const state = useStore<ContainerState>({
    get classes() {
      return containerService.getClasses(props.centered || false, props.fluid, props.className || props.classList);
    }
  });

  return <div class={state.classes.base}>{props.children}</div>;
}
