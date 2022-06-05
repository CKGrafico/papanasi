import { onMount, useMetadata, useRef, useState } from '@builder.io/mitosis';
import { addScript } from '../../../helpers';
import { ExternalLibrary, SharedProps } from '../../../models';
import './itchio.css';

export type ItchioProps = {} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });

const global: Window & ExternalLibrary = window;
export default function Itchio(props: ItchioProps) {
  const elementRef = useRef();

  const state = useState({
    classes: '',
    onMount() {
      state.classes = `pa-itchio ${props.className || props.class || ''}`;

      try {
        addScript('https://static.itch.io/api.js', 'itchio').then(() => {
          global.Itch.attachBuyButton(elementRef, {
            user: 'leafo',
            game: 'x-moon'
          });
        });
      } catch (e) {
        console.error(e);
      }
    }
  });

  onMount(() => state.onMount());

  return (
    <div class={state.classes} ref={elementRef}>
      {props.children}
    </div>
  );
}
