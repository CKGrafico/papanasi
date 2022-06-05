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
      function setInitialProps() {
        state.classes = `pa-itchio ${props.className || props.class || ''}`;
      }

      async function loadScript() {
        await addScript('https://static.itch.io/api.js', 'itchio');
        global.Itch.attachBuyButton(elementRef, {
          user: 'leafo',
          game: 'x-moon'
        });
      }

      setInitialProps();
      loadScript();
    }
  });

  onMount(() => state.onMount());

  return (
    <div class={state.classes} ref={elementRef}>
      {props.children}
    </div>
  );
}
