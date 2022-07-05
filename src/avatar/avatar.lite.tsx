import { onMount, Show, useMetadata, useState } from '@builder.io/mitosis';
import { classesToString } from '../../../helpers';
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
    initials: '',
    autoColor: true
  });

  onMount(() => {
    const setInitialProps = (variant, disabled, className) => {
      state.classes = classesToString([
        'pa-avatar',
        [variant, `pa-avatar--${variant}`],
        [disabled, 'is-disabled'],
        className || ''
      ]);

      state.autoColor = variant ? false : state.autoColor;
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
    setNameInitials(props.name || '');
    setSource(props.url, props.unavatar);
  });

  return (
    <div className={state.classes} style={{ backgroundImage: state.src }}>
      <Show when={state.src}>
        <img className="pa-avatar__image" src={state.src} alt={props.name} />
      </Show>
      <Show when={!state.src}>
        <>{state.initials}</>
      </Show>
    </div>
  );
}
