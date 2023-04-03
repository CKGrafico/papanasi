import { onInit, Show, useMetadata, useStore } from '@builder.io/mitosis';
import { debug } from '~/helpers';
import './itchio.css';
import type { ItchioProps, ItchioState } from './itchio.model';
import { itchioService } from './itchio.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Itchio(props: ItchioProps) {
  const state = useStore<ItchioState>({
    loaded: false,
    get classes() {
      return itchioService.getClasses(props.className);
    },
    gameInfo: null,
    onClickAction(user: string, game: string, width: number, height: number) {
      itchioService.onClickAction(user, game, width, height);
    }
  });

  onInit(() => {
    async function getData() {
      const data = await itchioService.processInfo(props.user, props.game, props.secret);

      state.gameInfo = data;
      state.loaded = true;

      debug('ItchioService callback processed info');
      props.onLoad && props.onLoad(data);
    }

    getData();
  });

  return (
    <div class={state.classes.base}>
      <div class="pa-itchio__container">
        <Show when={state.loaded}>
          <img class="pa-itchio__image" alt={state.gameInfo.title} src={state.gameInfo.cover_image}></img>
        </Show>
        <div class="pa-itchio__info">
          <Show when={state.loaded}>
            <div class="pa-itchio__texts">
              <span class="pa-itchio__title">{state.gameInfo.title}</span>
              <span class="pa-itchio__price">{state.gameInfo.price}</span>
            </div>
          </Show>

          <span
            class="pa-itchio__children"
            onClick={() => state.onClickAction(props.user, props.game, props.width, props.height)}
          >
            <Show when={state.loaded}>
              <span>{props.children}</span>
            </Show>

            <Show when={!state.loaded}>
              <span>{props.slotLoading}</span>
            </Show>
          </span>
        </div>
      </div>
    </div>
  );
}
