import { useMetadata, useStore } from '@builder.io/mitosis';
import './button.css';
import type { ButtonProps, ButtonState } from './button.model';
import { buttonService } from './button.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Button(props: ButtonProps) {
  const state = useStore<ButtonState>({
    get classes() {
      return buttonService.getClasses(props.variant, props.outline, props.intent, props.disabled, props.className);
    }
  });

  return <button class={state.classes.base}>{props.children}</button>;
}
