import { onMount, Show, useMetadata, useState } from '@builder.io/mitosis';
import { classesToString, randomColor } from '../../../helpers';
import { Dynamic, SharedProps, Variant } from '../../../models';
import './avatar.css';

export type AvatarProps = {
  variant?: Dynamic<Variant>;
  name?: string;
  unavatar?: string;
  url?: string;
  disabled?: boolean;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });
export default function Avatar(props: AvatarProps) {
  const state = useState({
    classes: '',
    style: {},
    src: null,
    initials: ''
  });

  onMount(() => {
    const setInitialProps = (variant, disabled, className) => {
      state.classes = classesToString([
        'pa-avatar',
        [variant, `pa-avatar--${variant}`],
        [disabled, 'is-disabled'],
        className || ''
      ]);
    };

    const setStyleProps = (variant, name) => {
      if (state.src) {
        state.style = {
          ...state.style,
          backgroundImage: state.src
        };
      }

      if (!variant) {
        const color = randomColor(name);

        state.style = {
          ...state.style,
          color: color.foreground,
          backgroundColor: color.background
        };
      }
    };

    const setNameInitials = (name) => {
      // From: https://stackoverflow.com/a/63763497/3274609
      state.initials = name
        .match(/(^\S\S?|\s\S)?/g)
        .map((v) => v.trim())
        .join('')
        .match(/(^\S|\S$)?/g)
        .join('')
        .toLocaleUpperCase();
    };

    const setSource = (url, unavatar) => {
      if (unavatar) {
        state.src = `https://unavatar.io/${unavatar}`;
        return;
      }

      state.src = url;
    };

    setInitialProps(props.variant, props.disabled, props.className);
    setStyleProps(props.variant, props.name);
    setNameInitials(props.name || '');
    setSource(props.url, props.unavatar);
  });

  return (
    <div className={state.classes} style={state.style} title={props.name}>
      <Show when={state.src}>
        <img className="pa-avatar__image" src={state.src} alt={props.name} />
      </Show>
      <Show when={!state.src}>
        <>{state.initials}</>
      </Show>
    </div>
  );
}
