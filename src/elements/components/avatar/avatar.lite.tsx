import { onInit, Show, useMetadata, useStore } from '@builder.io/mitosis';
import './avatar.css';
import type { AvatarProps, AvatarState } from './avatar.model';
import { avatarService } from './avatar.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Avatar(props: AvatarProps) {
  const state = useStore<AvatarState>({
    get classes() {
      return avatarService.getClasses(props.variant, props.disabled, props.className || props.classList);
    },
    get initials() {
      return avatarService.getInitials(props.name);
    },
    get source() {
      return avatarService.getSource(props.url, props.unavatar);
    },
    styles: { container: null }
  });

  onInit(() => {
    async function getData() {
      state.styles = await avatarService.getStyles(props.name, props.variant);
    }

    getData();
  });

  return (
    <div class={state.classes.base} title={props.name}>
      <Show when={state.styles.container}>
        <div class={state.classes.container} style={state.styles.container}>
          <Show when={state.source}>
            <img class="pa-avatar__image" src={state.source} alt={props.name} />
          </Show>
          <Show when={!state.source}>
            <span>{state.initials}</span>
          </Show>
        </div>
      </Show>
    </div>
  );
}
