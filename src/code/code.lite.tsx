import { For, onMount, onUnMount, onUpdate, Show, useMetadata, useRef, useStore } from '@builder.io/mitosis';
import copy from 'copy-to-clipboard';
import { getObjectValue } from '~/helpers';
import './code.css';
import { CodeProps, CodeState } from './code.model';
import { codeService } from './code.service';
useMetadata({ isAttachedToShadowDom: true });

export default function Code(props: CodeProps) {
  const codeRef = useRef<HTMLElement>();

  const state = useStore<CodeState>({
    loaded: false,
    classes: { base: '', editor: '' },
    value(x, y) {
      return getObjectValue(x, y);
    }
  });

  onMount(() => {
    state.classes = codeService.getClasses(props.language, props.className);
  });

  onUnMount(() => {
    codeService.destroy();
  });

  onUpdate(() => {
    if (!state.classes?.editor) {
      return;
    }

    codeService.initialize(codeRef, props.code, props.language, props.theme || 'default');

    codeService.onUpdate((code: string) => {
      state.loaded = true;
      props.onUpdate && props.onUpdate(code);
    });
  }, [state.classes]);

  return (
    // <Show when={state.loaded}>
    <div class={state.classes.base}>
      <pre>
        <code ref={codeRef} class={state.classes.editor}></code>
      </pre>

      <div class="pa-code__actions">
        <For each={props.links}>
          {(link, index) => (
            <>
              <Show when={state.value(link, 'url')}>
                <a class="pa-code__action" data-key={index} href={state.value(link, 'url')} target="_blank">
                  {state.value(link, 'icon') && (
                    <img class="pa-code__icon" src={state.value(link, 'icon')} alt={state.value(link, 'label')} />
                  )}
                  {state.value(link, 'label')}
                </a>
              </Show>

              <Show when={!state.value(link, 'url')}>
                <span class="pa-code__action pa-code__action--text" data-key={index}>
                  {state.value(link, 'icon') && (
                    <img class="pa-code__icon" src={state.value(link, 'icon')} alt={state.value(link, 'label')} />
                  )}
                  {state.value(link, 'label')}
                </span>
              </Show>
            </>
          )}
        </For>

        <Show when={!props.disableCopy}>
          <span class="pa-code__action pa-code__action--copy" onClick={() => copy(props.code)}>
            <span>{props.slotCopy}</span>
          </span>
        </Show>
      </div>
    </div>
    // </Show>
  );
}
