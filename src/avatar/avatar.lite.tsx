import { onMount, Show, useMetadata, useStore } from '@builder.io/mitosis';
import './avatar.css';
import { AvatarProps, AvatarState } from './avatar.model';
import { avatarService } from './avatar.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Avatar(props: AvatarProps) {
  const state = useStore<AvatarState>({
    loaded: false,
    classes: { base: '', container: '' },
    styles: { container: null },
    initials: null,
    src: null
  });

  onMount(() => {
    state.loaded = true;
    state.classes = avatarService.getClasses(props.variant, props.disabled, props.className);
    state.styles = avatarService.getStyles(props.name, props.variant);
    state.initials = avatarService.getInitials(props.name);
    state.src = avatarService.getSource(props.name, props.variant);
  });

  return (
    <Show when={state.loaded}>
      <div class={state.classes.base} title={props.name}>
        <Show when={state.styles.container}>
          <div class={state.classes.container} style={state.styles.container}>
            <Show when={state.src}>
              <img class="pa-avatar__image" src={state.src} alt={props.name} />
            </Show>
            <Show when={!state.src}>
              <span>{state.initials}</span>
            </Show>
          </div>
        </Show>
      </div>
    </Show>
  );
}
