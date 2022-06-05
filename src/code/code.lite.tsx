import { onMount, useMetadata, useRef, useState } from '@builder.io/mitosis';
import hljs from 'highlight.js/lib/core';
import { classesToString } from '../../../helpers';
import { SharedProps } from '../../../models';
import './code.css';

export type CodeProps = {
  editable: boolean;
  language: string;
  theme?: string;
  onChange?: (text: string) => void;
  onExit?: (text: string) => void;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });

export default function Code(props: CodeProps) {
  const previewRef = useRef();
  const codeRef = useRef();

  const state = useState({
    classes: '',
    isEditing: false,
    isDark: false,
    code: '',
    previewCode: '',
    onMounted() {
      function setInitialProps() {
        state.classes = classesToString(['pa-code', [props.className]]);
        state.code = props.children;
        state.isDark = props.theme.toLowerCase().match(/(dark|night|blue)/);
      }

      function highlightCode() {
        import('highlight.js/styles/' + (props.theme || 'default') + '.css');
        hljs.registerLanguage(props.language, require('highlight.js/lib/languages/' + props.language));

        const nodes = previewRef.querySelectorAll('pre code');
        nodes.forEach((node) => hljs.highlightElement(node));
      }

      setInitialProps();
      highlightCode();
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

      const nodes = previewRef.querySelectorAll('pre code');
      nodes.forEach((node) => hljs.highlightBlock(node));
    },
    onKeyUp() {
      state.previewCode = codeRef.innerText;

      if (props.onChange) {
        props.onChange(codeRef.innerText);
      }
    }
  });

  onMount(() => state.onMounted());

  return (
    <div className={state.classes}>
      <pre
        className={'pa-code__preview ' + (state.isEditing ? 'is-editing' : '')}
        ref={previewRef}
        onClick={() => state.onClick()}
      >
        <code className={'pa-code__preview-block language-' + props.language}>
          {state.previewCode || props.children}
        </code>
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
          suppressContentEditableWarning={true}
          onKeyUp={() => state.onKeyUp()}
          onBlur={() => state.onBlur()}
        >
          {state.code}
        </code>
      </pre>
    </div>
  );
}
