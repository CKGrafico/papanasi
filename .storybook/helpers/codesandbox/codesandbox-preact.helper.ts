import lernaJson from '../../../lerna.json';
import { generateCodeSandboxLink } from './codesandbox.helper';

export function generatePreactCodeSandboxLink(options) {
  const { components, extensions, code, dependencies } = options;

  const previewCode = `import { ${components.join(', ')} ${
    components.length > 0 && extensions.length > 0 ? ', ' : ''
  }${extensions.join(', ')} } from '@papanasi/preact';
import '@papanasi/preact/papanasi.css';${[...extensions, ''].join('(); \n')}

export default class App extends Component { render() { return (${code}
); }}
`;

  const demoCode = `import { Component, render } from "preact";

${previewCode}

render(<App />, document.getElementById("root"));
`.trim();

  const projectDependencies = {
    ...dependencies,
    preact: '10.2.1',
    '@papanasi/preact': `${lernaJson.version}`
  };

  const devDependencies = {
    'preact-cli': '^1.4.1'
  };

  const { url } = generateCodeSandboxLink({
    demoCode,
    dependencies: projectDependencies,
    devDependencies
  });

  return { url, content: previewCode };
}
