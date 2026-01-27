import { For, onUnMount, onUpdate, Show, useMetadata, useRef, useStore } from '@builder.io/mitosis';
import { getObjectValue } from '~/helpers';
import './code.css';
import type { CodeProps, CodeState } from './code.model';
import { CodeService } from './code.service';
useMetadata({ isAttachedToShadowDom: true });

export default function Code(props: CodeProps) {
  const codeRef = useRef(null);

  const state = useStore<CodeState>({
    loaded: false,
    codeService: null,
    classes: { base: '', editor: '' }
  });

  onUpdate(() => {
    // Needed for qwik bug
    if (!codeRef) {
      return;
    }

    const service = new CodeService();

    service.initialize(codeRef, props.language, props.theme || 'github').then(() => {
      state.classes = service.getClasses(props.language, props.className || props.classList);
      state.codeService = service;
      state.loaded = true;
    });
  }, [codeRef]);

  onUpdate(() => {
    if (!state.loaded) {
      return;
    }

    state.codeService.update(props.code);
    state.codeService.setEditable(codeRef, props.editable);

    state.codeService.onUpdate((code: string) => {
      if (props.onUpdate) {
        props.onUpdate(code);
      }
    });
  }, [state.loaded, props.editable, codeRef]);

  onUnMount(() => {
    if (state.loaded) {
      state.codeService.destroy();
    }
  });

  return (
    <div class={state.classes.base}>
      <pre>
        <span ref={codeRef} class={state.classes.editor}></span>
      </pre>

      <Show when={state.loaded}>
        <div class="pa-code__actions">
          <For each={props.links}>
            {(link, index) => (
              <div key={index} class="pa-code__action">
                <Show when={getObjectValue(link, 'url')}>
                  <a class="pa-code__link" href={getObjectValue(link, 'url')} target="_blank">
                    <Show when={getObjectValue(link, 'icon')}>
                      <img
                        class="pa-code__icon"
                        src={getObjectValue(link, 'icon')}
                        alt={getObjectValue(link, 'label')}
                      />
                    </Show>
                    {getObjectValue(link, 'label')}
                  </a>
                </Show>

                <Show when={!getObjectValue(link, 'url')}>
                  <span class="pa-code__link pa-code__link--text">
                    <Show when={getObjectValue(link, 'icon')}>
                      <img
                        class="pa-code__icon"
                        src={getObjectValue(link, 'icon')}
                        alt={getObjectValue(link, 'label')}
                      />
                    </Show>
                    {getObjectValue(link, 'label')}
                  </span>
                </Show>
              </div>
            )}
          </For>

          <Show when={!props.disableCopy && Boolean(props.slotCopy)}>
            <span class="pa-code__action pa-code__action--copy" onClick={() => state.codeService.copy(props.code)}>
              <span class="pa-code__link">{props.slotCopy}</span>
            </span>
          </Show>
        </div>
      </Show>
    </div>
  );
}
