import { onMount, useMetadata, useRef, useState } from '@builder.io/mitosis';
import hljs from 'highlight.js/lib/core';
import { classesToString } from '../../../helpers';
import { SharedProps } from '../../../models';
import './code.css';

export type CodeProps = {
  editable: boolean;
  languages: string[];
  theme?: string;
  links?: { label: string; url: string }[];
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
    highlightCode(languages = ['javascript', 'typescript', 'xml', 'css']) {
      languages.forEach((language) =>
        hljs.registerLanguage(language, require('highlight.js/lib/languages/' + language))
      );

      const nodes = previewRef.querySelectorAll('pre code');
      nodes.forEach((node) => hljs.highlightElement(node as HTMLElement));
    },
    onLoad() {
      // Cannot move outside because the Refs lost 'this'
      function setInitialProps(className, children, theme) {
        state.classes = classesToString(['pa-code', className]);
        state.code = children;
        state.isDark = theme?.toLowerCase().match(/(dark|night|blue)/);
      }

      setInitialProps(props.className, props.children, props.theme);
      import('highlight.js/styles/' + (props.theme || 'default') + '.css');

      state.highlightCode(props.languages);
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
        <code className={'pa-code__preview-block'}>{state.previewCode || props.children}</code>
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

      <div className="pa-code__actions">
        {props.links?.map((link, index) => (
          <a className="pa-code__action" data-key={index} href={link['url']} target="_blank">
            {link['label']}
          </a>
        ))}
      </div>
    </div>
  );
}
