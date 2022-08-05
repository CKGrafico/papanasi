import { onMount, Show, useMetadata, useStore } from '@builder.io/mitosis';
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
  const state = useStore({
    classes: '',
    customStyles: null,
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
    <div className={state.classes} title={props.name}>
      <Show when={state.customStyles}>
        <div className="pa-avatar__container" style={state.customStyles}>
          <Show when={state.src}>
            <img className="pa-avatar__image" src={state.src} alt={props.name} />
          </Show>
          <Show when={!state.src}>
            <span>{state.initials}</span>
          </Show>
        </div>
      </Show>
    </div>
  );
}
