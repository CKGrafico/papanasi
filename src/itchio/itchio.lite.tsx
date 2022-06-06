import { onMount, onUpdate, useMetadata, useRef, useState } from '@builder.io/mitosis';
import { addScript, classesToString, waitUntilTrue } from '../../../helpers';
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
    onMounted() {
      function setInitialProps() {
        state.classes = classesToString(['pa-itchio', props.className]);
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

  onMount(() => state.onMounted());
  onUpdate(() => state.onLoadScript(), [state.isScriptLoaded]);
  onUpdate(() => state.onLoadGameInfo(), [state.gameInfo]);

  return (
    <div className={state.classes}>
      {!state.gameInfo ? (
        <span>Loading...</span>
      ) : (
        <div className="pa-itchio__container">
          <img className="pa-itchio__image" src={state.gameInfo.cover_image}></img>
          <div className="pa-itchio__info">
            <div className="pa-itchio__texts">
              <span className="pa-itchio__title">{state.gameInfo.title}</span>
              <span className="pa-itchio__price">{state.gameInfo.price}</span>
            </div>
            {props.children && (
              <span className="pa-itchio__children" ref={elementRef}>
                {props.children}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
