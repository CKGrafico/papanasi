import { onMount, useMetadata, useState } from '@builder.io/mitosis';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';
import { SharedProps } from '../../../models';
import './code.css';
hljs.registerLanguage('javascript', javascript);

export type CodeProps = {
  code: string;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });

export default function Code(props: CodeProps) {
  const state = useState({
    highlighted: ''
  });

  onMount(() => {
    state.highlighted = hljs.highlightAuto('const a = 1;').value;
  });

  return (
    <pre>
      <code>{highlighted}</code>
    </pre>
  );
}
