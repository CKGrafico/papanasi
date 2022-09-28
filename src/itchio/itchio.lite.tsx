import { onMount, Show, useMetadata, useRef, useStore } from '@builder.io/mitosis';
import { classesToString } from '../../../helpers';
import './itchio.css';
import { ItchioProps } from './itchio.model';
import { itchioService } from './itchio.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Itchio(props: ItchioProps) {
  const actionRef = useRef();

  const state = useStore({
    classes: '',
    isLoadingGameInfo: false,
    gameInfo: null,
    onMounted() {
      const setInitialProps = (class) => {
        state.classes = classesToString(['pa-itchio', class || '']);
      };

      const onLoadScript = async () => {
        if (state.isLoadingGameInfo) {
          return;
        }

        state.isLoadingGameInfo = true;

        const data = await itchioService.getGameData(
          actionRef,
          props.user,
          props.game,
          props.width,
          props.height,
          props.secret
        );

        state.gameInfo = data;
        props.onLoad && props.onLoad();
      };

      const load = async () => {
        await itchioService.loadScript();
        await onLoadScript();
      };

      setInitialProps(props.class);
      load();
    }
  });

  onMount(() => state.onMounted());

  return (
    <div class={state.classes}>
      <div class="pa-itchio__container">
        <Show when={state.gameInfo}>
          <img class="pa-itchio__image" alt={state.gameInfo.title} src={state.gameInfo.cover_image}></img>
        </Show>
        <div class="pa-itchio__info">
          <Show when={state.gameInfo}>
            <div class="pa-itchio__texts">
              <span class="pa-itchio__title">{state.gameInfo.title}</span>
              <span class="pa-itchio__price">{state.gameInfo.price}</span>
            </div>
          </Show>

          <span class="pa-itchio__children" ref={actionRef}>
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
