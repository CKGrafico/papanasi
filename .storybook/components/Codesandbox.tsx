import * as React from 'react';
import {
  generateAngularCodeSandboxLink,
  generatePreactCodeSandboxLink,
  generateQwikCodeSandboxLink,
  generateReactCodeSandboxLink,
  generateSolidCodeSandboxLink,
  generateSvelteCodeSandboxLink,
  generateVueCodeSandboxLink,
  generateWebCodeSandboxLink
} from '../../helpers';
import { Code } from '../../packages/react/src';

enum CodesandboxPlatform {
  Angular = 'angular',
  Preact = 'preact',
  Qwik = 'qwik',
  React = 'react',
  Solid = 'solid',
  Svelte = 'svelte',
  Vue = 'vue',
  WebComponents = 'webcomponents'
}

type CodesandboxProps = {
  components: string[];
  extensions: string[];
  code: string;
  platform: CodesandboxPlatform;
  dependencies?: { [key: string]: string };
};

const generators = {
  [CodesandboxPlatform.Angular]: generateAngularCodeSandboxLink,
  [CodesandboxPlatform.Preact]: generatePreactCodeSandboxLink,
  [CodesandboxPlatform.Qwik]: generateQwikCodeSandboxLink,
  [CodesandboxPlatform.React]: generateReactCodeSandboxLink,
  [CodesandboxPlatform.Solid]: generateSolidCodeSandboxLink,
  [CodesandboxPlatform.Svelte]: generateSvelteCodeSandboxLink,
  [CodesandboxPlatform.Vue]: generateVueCodeSandboxLink,
  [CodesandboxPlatform.WebComponents]: generateWebCodeSandboxLink
};

const icons = {
  [CodesandboxPlatform.Angular]: 'angular-icon',
  [CodesandboxPlatform.Preact]: 'preact',
  [CodesandboxPlatform.Qwik]: 'qwik',
  [CodesandboxPlatform.React]: 'react',
  [CodesandboxPlatform.Solid]: 'solidjs-icon',
  [CodesandboxPlatform.Svelte]: 'svelte-icon',
  [CodesandboxPlatform.Vue]: 'vue',
  [CodesandboxPlatform.WebComponents]: 'w3c'
};

export function Codesandbox(props: CodesandboxProps) {
  const { components = [], extensions = [], code, platform, dependencies = {} } = props;

  const { url, content } = generators[platform]({ components, extensions, code, dependencies });
  const iconPlatform = icons[platform];
  const icon = `https://raw.githubusercontent.com/gilbarbara/logos/master/logos/${iconPlatform}.svg`;

  return (
    <div className="codesandbox">
      <Code
        language="jsx"
        slotCopy={'Copy'}
        theme="github"
        code={content}
        links={[
          {
            icon
          },
          url && {
            label: 'Sandbox',
            icon: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/codesandbox-icon.svg',
            url
          }
        ].filter((x) => x)}
      />
    </div>
  );
}
