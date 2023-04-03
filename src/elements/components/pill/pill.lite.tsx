import { useMetadata, useStore } from '@builder.io/mitosis';
import './pill.css';
import type { PillProps, PillState } from './pill.model';
import { pillService } from './pill.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Pill(props: PillProps) {
  const state = useStore<PillState>({
    get classes() {
      return pillService.getClasses(props.variant, props.intent, props.disabled, props.className || props.classList);
    }
  });

  return <span class={state.classes.base}>{props.children}</span>;
}
