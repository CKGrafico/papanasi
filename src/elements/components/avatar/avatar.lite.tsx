import { onMount, Show, useMetadata, useStore } from '@builder.io/mitosis';
import './avatar.css';
import type { AvatarProps, AvatarState } from './avatar.model';
import { avatarService } from './avatar.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Avatar(props: AvatarProps) {
  const state = useStore<AvatarState>({
    loaded: false,
    classes: { base: '', container: '' },
    styles: { container: null },
    initials: null,
    source: null
  });

  onMount(() => {
    state.loaded = true;
    state.classes = avatarService.getClasses(props.variant, props.disabled, props.className || props.classList);
    avatarService.getStyles(props.name, props.variant).then((newStyles) => (state.styles = newStyles));
    state.initials = avatarService.getInitials(props.name);
    state.source = avatarService.getSource(props.url, props.unavatar);
  });

  return (
    <Show when={state.loaded}>
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
    </Show>
  );
}
