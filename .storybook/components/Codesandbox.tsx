import React from 'react';
import { generateReactCodeSandboxLink } from '../../helpers';
import { Code } from '../../packages/react';

enum CodesandboxPlatform {
  Angular = 'angular',
  React = 'react',
  Solid = 'solid',
  Svelte = 'svelte',
  Vue = 'vue',
  WebComponents = 'webcomponents'
}

type CodesandboxProps = {
  components: string[];
  code: string;
  platform: CodesandboxPlatform;
};

const generators = {
  [CodesandboxPlatform.Angular]: generateReactCodeSandboxLink,
  [CodesandboxPlatform.React]: generateReactCodeSandboxLink,
  [CodesandboxPlatform.Solid]: generateReactCodeSandboxLink,
  [CodesandboxPlatform.Svelte]: generateReactCodeSandboxLink,
  [CodesandboxPlatform.Vue]: generateReactCodeSandboxLink,
  [CodesandboxPlatform.WebComponents]: generateReactCodeSandboxLink
};

export function Codesandbox(props: CodesandboxProps) {
  const { components, code, platform } = props;

  const { url, content } = generators[platform]({ components, code });
  debugger;

  return (
    <div className="codesandbox">
      <Code language="typescript" theme="github" links={[{ label: 'Sandbox', url }]}>
        {content}
      </Code>
    </div>
  );
}
