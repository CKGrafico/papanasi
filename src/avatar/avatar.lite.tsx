import { onMount, Show, useMetadata } from '@builder.io/mitosis';
import { signal } from '@preact/signals-core';
import './avatar.css';
import { AvatarProps } from './avatar.model';
import { avatarService } from './avatar.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Avatar(props: AvatarProps) {
  const classes = signal('');
  const containerClasses = signal('');
  const initials = signal('');
  const customStyles = signal(null);
  const src = signal(null);

  onMount(() => {
    const customClasses = avatarService.getClasses(props);

    containerClasses.value = customClasses.containerClasses;
    classes.value = customClasses.classes;
    initials.value = avatarService.getInitials(props);
    customStyles.value = avatarService.getColor(props);
    src.value = avatarService.getSource(props);
  });

  return (
    <div className={classes.value} title={props.name}>
      <Show when={customStyles.value}>
        <div className={containerClasses.value} style={customStyles.value}>
          <Show when={src.value}>
            <img className="pa-avatar__image" src={src.value} alt={props.name} />
          </Show>
          <Show when={!src.value}>
            <span>{initials.value}</span>
          </Show>
        </div>
      </Show>
    </div>
  );
}
