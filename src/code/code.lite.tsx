import { onUpdate, useMetadata, useState } from '@builder.io/mitosis';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { SharedProps } from '../../../models';
import './code.css';

export type CodeProps = {
  code: string;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });

export default function Code(props: CodeProps) {
  const [highlighted, setHighlighted] = useState('-');

  onUpdate(() => {
    setHighlighted(hljs.highlightAuto('<span>Hello World!</span>').value);
  }, [props.code]);

  return (
    <pre>
      <code>{highlighted}</code>
    </pre>
  );
}
