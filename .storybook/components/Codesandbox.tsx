import {
  generateAngularCodeSandboxLink,
  generateReactCodeSandboxLink,
  generateSolidCodeSandboxLink,
  generateSvelteCodeSandboxLink,
  generateVueCodeSandboxLink,
  generateWebCodeSandboxLink
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
  [CodesandboxPlatform.Solid]: generateSolidCodeSandboxLink,
  [CodesandboxPlatform.Svelte]: generateSvelteCodeSandboxLink,
  [CodesandboxPlatform.Vue]: generateVueCodeSandboxLink,
  [CodesandboxPlatform.WebComponents]: generateWebCodeSandboxLink
};

const icons = {
  [CodesandboxPlatform.Angular]: 'angular-icon',
  [CodesandboxPlatform.React]: 'react',
  [CodesandboxPlatform.Solid]: 'solidjs-icon',
  [CodesandboxPlatform.Svelte]: 'svelte-icon',
  [CodesandboxPlatform.Vue]: 'vue',
  [CodesandboxPlatform.WebComponents]: 'w3c'
};

export function Codesandbox(props: CodesandboxProps) {
  const { components, code, platform, dependencies = {} } = props;

  const { url, content } = generators[platform]({ components, code, dependencies });
  const iconPlatform = icons[platform];
  const icon = `https://raw.githubusercontent.com/gilbarbara/logos/master/logos/${iconPlatform}.svg`;

  return (
    <div className="codesandbox">
      <Code
        theme="github"
        links={[
          {
            icon
          },
          url && {
            label: 'Sandbox',
            icon: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/codesandbox.svg',
            url
          }
        ].filter((x) => x)}
      >
        {content}
      </Code>
    </div>
  );
}
