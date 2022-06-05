import { onMount, onUpdate, useMetadata, useRef, useState } from '@builder.io/mitosis';
import { addScript, waitUntilTrue } from '../../../helpers';
import { ExternalLibrary, SharedProps } from '../../../models';
import './itchio.css';

export type ItchioProps = {
  user: string;
  game: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
  secret?: string;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });

const global: Window & ExternalLibrary = window;
export default function Itchio(props: ItchioProps) {
  const elementRef = useRef();

  const state = useState({
    classes: '',
    isScriptLoaded: false,
    gameInfo: null,
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

      global.Itch.getGameData({
        user: props.user,
        game: props.game,
        secret: props.secret,
        onComplete: (data) => {
          state.gameInfo = data;
          props.onLoad && props.onLoad();
        }
      });
    },
    onLoadGameInfo() {
      if (!state.gameInfo) {
        return;
      }

      global.Itch.attachBuyButton(elementRef, {
        user: props.user,
        game: props.game
      });
    }
  });

  onMount(() => state.onMount());
  onUpdate(() => state.onLoadScript(), [state.isScriptLoaded]);
  onUpdate(() => state.onLoadGameInfo(), [state.gameInfo]);

  return (
    <div class={state.classes} ref={elementRef}>
      {!state.gameInfo ? (
        <span>Loading...</span>
      ) : (
        <div>
          <img src={state.gameInfo.cover_image}></img>
          <span>{state.gameInfo.title}</span>
          <span>{state.gameInfo.price}</span>
          {props.children}
        </div>
      )}
    </div>
  );
}
