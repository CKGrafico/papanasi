import lernaJson from '../../lerna.json';
import { generateCodeSandboxLink } from './codesandbox.helper';

export function generateSolidCodeSandboxLink(options) {
  const { components, code, dependencies } = options;

  const html = `<div class="app" id="app"></div>
<script src="index.tsx"></script>`;

  const previewCode = `import { ${components.join(', ')} } from '@papanasi/solid';
import '@papanasi/solid/dist/papanasi.css';

const App: Component = () => (${code}
);
`;

  const demoCode = `
import { Component } from "solid-js";
import { render } from "solid-js/web";

${previewCode}

render(() => <App />, document.getElementById("app"));
`.trim();

  const extraFiles = {
    '.babelrc': {
      content: `{
      "presets": [
        "env",
        "babel-preset-solid",
        "@babel/preset-typescript"
      ]
    }`
    }
  };

  const projectDependencies = {
    ...dependencies,
    '@babel/core': '7.14.6',
    '@babel/preset-typescript': '7.14.5',
    'babel-preset-solid': '1.0.0',
    'solid-js': '1.4.3',
    '@papanasi/solid': `${lernaJson.version}`
  };

  const devDependencies = {
    'parcel-bundler': '^1.6.1',
    typescript: '^4.2.0'
  };

  const { url } = generateCodeSandboxLink({
    html,
    demoCode,
    dependencies: projectDependencies,
    devDependencies,
    extraFiles,
    isTypescript: true,
    isJSX: true
  });

  return { url, content: previewCode };
}
