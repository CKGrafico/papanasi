import React from 'react';
import {
  generateAngularCodeSandboxLink,
  generateReactCodeSandboxLink,
  generateVueCodeSandboxLink
} from '../../helpers';
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
  dependencies?: { [key: string]: string };
};

const generators = {
  [CodesandboxPlatform.Angular]: generateAngularCodeSandboxLink,
  [CodesandboxPlatform.React]: generateReactCodeSandboxLink,
  [CodesandboxPlatform.Solid]: generateReactCodeSandboxLink,
  [CodesandboxPlatform.Svelte]: generateReactCodeSandboxLink,
  [CodesandboxPlatform.Vue]: generateVueCodeSandboxLink,
  [CodesandboxPlatform.WebComponents]: generateReactCodeSandboxLink
};

export function Codesandbox(props: CodesandboxProps) {
  const { components, code, platform, dependencies = {} } = props;

  const { url, content } = generators[platform]({ components, code, dependencies });

  return (
    <div className="codesandbox">
      <Code theme="github" links={[{ label: <span>Sandbox</span>, url }]}>{content}</Code>
    </div>
  );
}
