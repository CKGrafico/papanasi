import { For, onMount, Show, useMetadata, useRef, useStore } from '@builder.io/mitosis';
import copy from 'copy-to-clipboard';
import hljs from 'highlight.js/lib/core';
import { classesToString, getObjectValue } from '../../../helpers';
import { SharedProps } from '../../../models';
import './code.css';

export type CodeProps = {
  editable: boolean;
  languages: string[];
  code: string;
  theme?: string; // TODO: dynamic themes
  links?: { label: string; url: string; icon: string }[];
  canCopy?: boolean;
  copyLabel?: string;
  onUpdate?: (text: string) => void;
  onExit?: (text: string) => void;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });

export default function Code(props: CodeProps) {
  const previewRef = useRef();
  const codeRef = useRef();

  const state = useStore({
    classes: '',
    isEditing: false,
    isDark: false,
    isCopy: true,
    copyText: 'Copy',
    rawCode: '',
    previewCode: '',
    highlightCode(languages = ['javascript', 'typescript', 'xml', 'css']) {
      const loadAndHighlight = () => {
        languages.forEach((language) =>
          hljs.registerLanguage(language, require('highlight.js/lib/languages/' + language))
        );

        const nodes = previewRef.querySelectorAll('pre code');
        nodes.forEach((node) => hljs.highlightElement(node as HTMLElement));
      };

      loadAndHighlight();
    },
    onClick() {
      if (!props.editable) {
        return;
      }

      state.isEditing = true;
      codeRef.focus();
    },
    onBlur() {
      if (!props.editable) {
        return;
      }

      state.isEditing = false;

      if (props.onExit) {
        props.onExit(codeRef.innerText);
      }

      state.highlightCode(props.languages);
    },
    onKeyUp() {
      state.previewCode = codeRef.innerText;

      if (props.onUpdate) {
        props.onUpdate(codeRef.innerText);
      }
    },
    value(x, y) {
      return getObjectValue(x, y);
    }
  });

  onMount(() => {
    const setInitialProps = (className, code, theme, canCopy, copyLabel) => {
      state.classes = classesToString(['pa-code', className || '']);
      state.rawCode = code;
      state.previewCode = code;
      state.isDark = theme?.toLowerCase().match(/(dark|night|blue)/);
      state.isCopy = canCopy !== undefined ? canCopy : state.isCopy;
      state.copyText = copyLabel || state.copyText;
    };

    setInitialProps(props.className, props.code, props.theme, props.canCopy, props.copyLabel);
    state.highlightCode(props.languages);
  });

  return (
    <div className={state.classes}>
      <pre
        className={'pa-code__preview ' + (state.isEditing ? 'is-editing' : '')}
        ref={previewRef}
        onClick={() => state.onClick()}
      >
        <code className={'pa-code__preview-block'}>{state.previewCode || props.code}</code>
      </pre>

      <pre
        className={
          'pa-code__editor ' + (state.isEditing ? 'is-editing ' : '') + (state.isDark ? 'pa-code__editor--dark ' : '')
        }
      >
        <code
          ref={codeRef}
          className={'pa-code__editor-block'}
          contentEditable={true}
          onKeyUp={() => state.onKeyUp()}
          onBlur={() => state.onBlur()}
        >
          {state.rawCode}
        </code>
      </pre>

      <div className="pa-code__actions">
        <For each={props.links}>
          {(link, index) => (
            <>
              <Show when={state.value(link, 'url')}>
                <a className="pa-code__action" data-key={index} href={state.value(link, 'url')} target="_blank">
                  {state.value(link, 'icon') && (
                    <img className="pa-code__icon" src={state.value(link, 'icon')} alt={state.value(link, 'label')} />
                  )}
                  {state.value(link, 'label')}
                </a>
              </Show>

              <Show when={!state.value(link, 'url')}>
                <span className="pa-code__action pa-code__action--text" data-key={index}>
                  {state.value(link, 'icon') && (
                    <img className="pa-code__icon" src={state.value(link, 'icon')} alt={state.value(link, 'label')} />
                  )}
                  {state.value(link, 'label')}
                </span>
              </Show>
            </>
          )}
        </For>

        <Show when={state.isCopy}>
          <span className="pa-code__action pa-code__action--copy" onClick={() => copy(state.rawCode)}>
            {state.copyText}
          </span>
        </Show>
      </div>
    </div>
  );
}
