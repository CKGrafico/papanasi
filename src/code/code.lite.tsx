import { onMount, useMetadata, useRef, useState } from '@builder.io/mitosis';
import hljs from 'highlight.js/lib/core';
import { SharedProps } from '../../../models';
import './code.css';

export type CodeProps = {
  editable: boolean;
  language: string;
  theme?: string;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });

export default function Code(props: CodeProps) {
  const codeRef = useRef();

  const state = useState({
    onMount() {
      hljs.registerLanguage(props.language, require('highlight.js/lib/languages/' + props.language));
      import('highlight.js/styles/' + (props.theme || 'default') + '.css');

      const nodes = codeRef.querySelectorAll('pre code');

      for (let i = 0; i < nodes.length; i++) {
        hljs.highlightBlock(nodes[i]);
      }
    }
  });

  onMount(() => state.onMount());

  return (
    <pre ref={codeRef}>
      <code class={'language-' + props.language + ' ' + (props.className || props.class || '')}>{props.children}</code>
    </pre>
  );
}
