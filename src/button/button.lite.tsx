import { onMount, useMetadata, useState } from '@builder.io/mitosis';
import { classesToString } from '../../../helpers';
import { Dynamic, Intent, SharedProps, Variant } from '../../../models';
import './button.css';

export type ButtonProps = {
  variant?: Dynamic<Variant>;
  intent?: Dynamic<Intent>;
  outline?: boolean;
  disabled?: boolean;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });
export default function Button(props: ButtonProps) {
  const state = useState({
    classes: ''
  });

  onMount(() => {
    // TODO: Move outside after mitosis new version
    function setInitialProps(props) {
      const { variant, outline, intent, disabled, className } = props;

      const classes = classesToString([
        'pa-button',
        [variant, `pa-button--${variant}`],
        [outline, 'pa-button--outline'],
        [intent, `is-${intent}`],
        [disabled, 'is-disabled'],
        className
      ]);

      return { classes };
    }

    const { classes } = setInitialProps(props);

    state.classes = classes;
  });

  return <button className={state.classes}>{props.children}</button>;
}
