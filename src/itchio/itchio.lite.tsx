import { onMount, onUpdate, useMetadata, useRef, useState } from '@builder.io/mitosis';
import { addScript, waitUntilTrue } from '../../../helpers';
import { ExternalLibrary, SharedProps } from '../../../models';
import './itchio.css';

export type ItchioProps = {} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });

const global: Window & ExternalLibrary = window;
export default function Itchio(props: ItchioProps) {
  const elementRef = useRef();

  const state = useState({
    classes: '',
    isScriptLoaded: false,
    onMount() {
      function setInitialProps() {
        state.classes = `pa-itchio ${props.className || props.class || ''}`;
      }

      async function loadScript() {
        await addScript('https://static.itch.io/api.js', 'itchio');
        await waitUntilTrue(() => global.Itch);
        state.isScriptLoaded = true;
      }

      setInitialProps();
      loadScript();
    },
    onLoadScript() {
      if (!state.isScriptLoaded) {
        return;
      }

      console.log(elementRef, global.Itch);
      global.Itch.attachBuyButton(elementRef, {
        user: 'leafo',
        game: 'x-moon'
      });
    }
  });

  onMount(() => state.onMount());
  onUpdate(() => state.onLoadScript(), [state.isScriptLoaded]);

  return (
    <div class={state.classes} ref={elementRef}>
      {props.children}
    </div>
  );
}
