import { onMount, Show, useMetadata, useRef, useStore } from '@builder.io/mitosis';
import { classesToString } from '../../../helpers';
import { SharedProps } from '../../../models';
import './itchio.css';
import { itchioService } from './itchio.service';

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

  const state = useStore({
    classes: '',
    isLoadingGameInfo: false,
    gameInfo: null
  });

  onMount(() => {
    const setInitialProps = (className) => {
      state.classes = classesToString(['pa-itchio', className || '']);
    };

    const onLoadScript = async () => {
      if (state.isLoadingGameInfo) {
        return;
      }

      state.isLoadingGameInfo = true;

      const data = await itchioService.getGameData(actionRef, props);

      state.gameInfo = data;
      props.onLoad && props.onLoad();
    };

    const load = async () => {
      await itchioService.loadScript();
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
