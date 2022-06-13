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

export default function Itchio(props: ItchioProps) {
  const actionRef = useRef();
  const global: Window & ExternalLibrary = window;

  const state = useState({
    classes: '',
    isScriptLoaded: false,
    gameInfo: null,
    onLoadGame() {
      // Cannot move outside because the Refs lost 'this'
      function onLoadGameInfo() {
        if (!state.gameInfo) {
          return;
        }

        global.Itch.attachBuyButton(actionRef, {
          user: props.user,
          game: props.game,
          width: props.width || 800,
          height: props.height || 600
        });
      }

      onLoadGameInfo();
    }
  });

  onMount(() => {
    const setInitialProps = (className) => {
      state.classes = classesToString(['pa-itchio', className || '']);
    };

    const loadScript = async () => {
      await addScript('https://static.itch.io/api.js', 'itchio');
      await waitUntilTrue(() => global.Itch);
      state.isScriptLoaded = true;
    };

    setInitialProps(props.className);
    loadScript();
  });

  onUpdate(() => {
    const onLoadScript = () => {
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
    };

    onLoadScript();
  }, [state.isScriptLoaded]);

  onUpdate(() => state.onLoadGame(), [state.gameInfo]);

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
            <span className="pa-itchio__children" ref={actionRef}>
              {props.children}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
