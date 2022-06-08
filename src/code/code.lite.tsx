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
    onLoad() {
      // Cannot move outside because the Refs lost 'this'
      function setInitialProps(className, children, theme) {
        state.classes = classesToString(['pa-code', className]);
        state.code = children;
        state.isDark = theme.toLowerCase().match(/(dark|night|blue)/);
      }

      function highlightCode(theme, language) {
        import('highlight.js/styles/' + (theme || 'default') + '.css');
        hljs.registerLanguage(language, require('highlight.js/lib/languages/' + language));

        const nodes = previewRef.querySelectorAll('pre code');
        nodes.forEach((node) => hljs.highlightElement(node as HTMLElement));
      }

      setInitialProps(props.className, props.children, props.theme);
      highlightCode(props.theme, props.language);
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
      nodes.forEach((node) => hljs.highlightBlock(node as HTMLElement));
    },
    onKeyUp() {
      state.previewCode = codeRef.innerText;

      if (props.onChange) {
        props.onChange(codeRef.innerText);
      }
    }
  });

  onMount(() => state.onLoad());

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
          onKeyUp={() => state.onKeyUp()}
          onBlur={() => state.onBlur()}
        >
          {state.code}
        </code>
      </pre>
    </div>
  );
}
