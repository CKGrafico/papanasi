import { onMount, useMetadata, useRef, useState, Show } from '@builder.io/mitosis';
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
    isLoadingGameInfo: false,
    gameInfo: null,
    attachButton() {
      global.Itch.attachBuyButton(actionRef, {
        user: props.user,
        game: props.game,
        width: props.width || 800,
        height: props.height || 600
      });
    }
  });

  onMount(() => {
    const setInitialProps = (className) => {
      state.classes = classesToString(['pa-itchio', className || '']);
    };

    const loadScript = async () => {
      await addScript('https://static.itch.io/api.js', 'itchio');
      await waitUntilTrue(() => global.Itch);
    };

    const onLoadScript = () => {
      if (state.isLoadingGameInfo) {
        return;
      }

      state.isLoadingGameInfo = true;

      global.Itch.getGameData({
        user: props.user,
        game: props.game,
        secret: props.secret,
        onComplete: (data) => {
          state.attachButton();
          state.gameInfo = data;
          props.onLoad && props.onLoad();
        }
      });
    };

    const load = async () => {
      await loadScript();
      await onLoadScript();
    };

    setInitialProps(props.className);
    load();
  });

  return (
    <div className={state.classes}>
      <div className="pa-itchio__container">
        <Show when={state.gameInfo}>
          <img className="pa-itchio__image" alt={state.gameInfo.title} src={state.gameInfo.cover_image}></img>
        </Show>
        <div className="pa-itchio__info">
          <Show when={state.gameInfo}>
            <div className="pa-itchio__texts">
              <span className="pa-itchio__title">{state.gameInfo.title}</span>
              <span className="pa-itchio__price">{state.gameInfo.price}</span>
            </div>
          </Show>

          <span className="pa-itchio__children" ref={actionRef}>
            <Show when={state.gameInfo}>
              <span>{props.children}</span>
            </Show>

            <Show when={!state.gameInfo}>
              <span>
                <span>Loading...</span>
              </span>
            </Show>
          </span>
        </div>
      </div>
    </div>
  );
}
