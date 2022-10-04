import { onMount, Show, useMetadata, useRef, useStore } from '@builder.io/mitosis';
import './itchio.css';
import { ItchioProps, ItchioState } from './itchio.model';
import { itchioService } from './itchio.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Itchio(props: ItchioProps) {
  const actionRef = useRef<HTMLSpanElement>();

  const state = useStore<ItchioState>({
    loaded: false,
    classes: { base: '' },
    gameInfo: null
  });

  onMount(() => {
    state.classes = itchioService.getClasses(props.className);

    itchioService.processInfo(actionRef, props.user, props.game, props.width, props.height, props.secret, (data) => {
      state.gameInfo = data;
      state.loaded = true;
      props.onLoad && props.onLoad(data);
    });
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

          <span class="pa-itchio__children" ref={actionRef}>
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
