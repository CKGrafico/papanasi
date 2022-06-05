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
        <div class="pa-itchio__container">
          <img class="pa-itchio__image" src={state.gameInfo.cover_image}></img>
          <div class="pa-itchio__info">
            <div className="pa-itchio__texts">
              <span class="pa-itchio__title">{state.gameInfo.title}</span>
              <span class="pa-itchio__price">{state.gameInfo.price}</span>
            </div>
            {props.children && <span class="pa-itchio__children">{props.children}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
