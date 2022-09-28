import { onMount, Show, useMetadata } from '@builder.io/mitosis';
import { signal } from '@preact/signals-core';
import { classesToString } from '../../../helpers';
import { Dynamic, SharedProps, Variant } from '../../../models';
import './avatar.css';
import { avatarService } from './avatar.service';

export type AvatarProps = {
  variant?: Dynamic<Variant>;
  name?: string;
  unavatar?: string;
  url?: string;
  disabled?: boolean;
} & SharedProps;

const classes = signal('');
const containerClasses = signal('');
const initials = signal('');
const customStyles = signal(null);
const src = signal(null);

useMetadata({ isAttachedToShadowDom: true });
export default function Avatar(props: AvatarProps) {
  onMount(() => {
    const setClasses = (variant, disabled, className) => {
      classes.value = classesToString([
        'pa-avatar',
        [variant, `pa-avatar--${variant}`],
        [disabled, 'is-disabled'],
        className || ''
      ]);

      containerClasses.value = classesToString(['pa-avatar__container', [variant, `pa-avatar--${variant}`]]);
    };

    setClasses(props.variant, props.disabled, props.className);

    initials.value = avatarService.getInitials(props.name || '');
    customStyles.value = avatarService.getColor(props.variant, props.name);
    src.value = props.unavatar ? `https://unavatar.io/${props.unavatar}` : props.url;
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
