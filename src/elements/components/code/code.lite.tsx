import { For, onUnMount, onUpdate, Show, useMetadata, useRef, useStore } from '@builder.io/mitosis';
import { getObjectValue } from '~/helpers';
import './code.css';
import type { CodeProps, CodeState } from './code.model';
import { CodeService } from './code.service';
useMetadata({ isAttachedToShadowDom: true });

export default function Code(props: CodeProps) {
  const codeRef = useRef<HTMLElement>();

  const state = useStore<CodeState>({
    loaded: false,
    codeService: null,
    classes: { base: '', editor: '' },
    value(x, y) {
      return getObjectValue(x, y);
    }
  });

  onUpdate(() => {
    // Needed for qwik bug
    const code = codeRef;

    if (!codeRef) {
      return;
    }

    async function getData() {
      const service = new CodeService();

      await service.initialize(codeRef, props.language, props.theme || 'github');
      state.classes = service.getClasses(props.language, props.className || props.classList);
      state.codeService = service;
      state.loaded = true;
    }

    getData();
  }, [codeRef]);

  onUpdate(() => {
    if (!state.loaded) {
      return;
    }

    state.codeService.update(props.code);
    state.codeService.setEditable(codeRef, props.editable);

    state.codeService.onUpdate((code: string) => {
      props.onUpdate && props.onUpdate(code);
    });
  }, [state.loaded, props.editable, codeRef]);

  onUnMount(() => {
    state.loaded && state.codeService.destroy();
  });

  return (
    <div class={state.classes.base}>
      <pre>
        <code ref={codeRef} class={state.classes.editor}></code>
      </pre>

      <Show when={state.loaded}>
        <div class="pa-code__actions">
          <For each={props.links}>
            {(link, index) => (
              <div key={index} class="pa-code__action">
                <Show when={state.value(link, 'url')}>
                  <a class="pa-code__link" href={state.value(link, 'url')} target="_blank">
                    {state.value(link, 'icon') && (
                      <img class="pa-code__icon" src={state.value(link, 'icon')} alt={state.value(link, 'label')} />
                    )}
                    {state.value(link, 'label')}
                  </a>
                </Show>

                <Show when={!state.value(link, 'url')}>
                  <span class="pa-code__link pa-code__link--text">
                    {state.value(link, 'icon') && (
                      <img class="pa-code__icon" src={state.value(link, 'icon')} alt={state.value(link, 'label')} />
                    )}
                    {state.value(link, 'label')}
                  </span>
                </Show>
              </div>
            )}
          </For>

          <Show when={!props.disableCopy && props.slotCopy}>
            <span class="pa-code__action pa-code__action--copy" onClick={() => state.codeService.copy(props.code)}>
              <span class="pa-code__link">{props.slotCopy}</span>
            </span>
          </Show>
        </div>
      </Show>
    </div>
  );
}
