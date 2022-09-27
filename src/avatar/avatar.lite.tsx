import { onMount, Show, useMetadata, useStore } from '@builder.io/mitosis';
import { signal } from '@preact/signals-core';
import { classesToString, randomColor } from '../../../helpers';
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
const initials = signal('');

useMetadata({ isAttachedToShadowDom: true });
export default function Avatar(props: AvatarProps) {
  const state = useStore({
    containerClasses: '',
    customStyles: null,
    src: null
  });

  function setNameInitials(name) {
    // initials.value = avatarService.getInitials(name);
    initials.value = avatarService.getInitials(
      Array(5)
        .fill(1)
        .map((n) => ((Math.random() * 36) | 0).toString(36))
        .join('') +
        ' ' +
        Array(5)
          .fill(1)
          .map((n) => ((Math.random() * 36) | 0).toString(36))
          .join('')
    );
  }

  onMount(() => {
    const setInitialProps = (variant, disabled, className) => {
      classes.value = classesToString([
        'pa-avatar',
        [variant, `pa-avatar--${variant}`],
        [disabled, 'is-disabled'],
        className || ''
      ]);

      state.containerClasses = classesToString(['pa-avatar__container', [variant, `pa-avatar--${variant}`]]);
    };

    const setSource = (url, unavatar) => {
      if (unavatar) {
        state.src = `https://unavatar.io/${unavatar}`;
        return;
      }

      state.src = url;
    };

    const setRandomColorStyles = (variant, name) => {
      if (variant) {
        state.customStyles = {};
        return;
      }

      const color = randomColor(name);

      state.customStyles = {
        ...state.customStyles,
        color: color.foreground,
        backgroundColor: color.background
      };
    };

    setInitialProps(props.variant, props.disabled, props.className);
    setNameInitials(props.name || '');
    setSource(props.url, props.unavatar);
    setRandomColorStyles(props.variant, props.name);
  });

  return (
    <div className={classes.value} title={props.name} onClick={() => setNameInitials(props.name)}>
      <Show when={state.customStyles}>
        <div className={state.containerClasses} style={state.customStyles}>
          <Show when={state.src}>
            <img className="pa-avatar__image" src={state.src} alt={props.name} />
          </Show>
          <Show when={!state.src}>
            <span>{initials.value}</span>
          </Show>
        </div>
      </Show>
    </div>
  );
}
