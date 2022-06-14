import lernaJson from '../../lerna.json';
import { generateCodeSandboxLink } from './codesandbox.helper';

export function generateReactCodeSandboxLink(options) {
  const { components, code, dependencies } = options;

  const html = `<div class="app" id="root"></div>`;

  const previewCode = `import { ${components.join(', ')} } from '@papanasi/react';
import '@papanasi/react/dist/papanasi.css';

const App = () => (${code}
);
`;

  const demoCode = `
import React from 'react';
import ReactDOM from 'react-dom';

${previewCode}

ReactDOM.render(
  <App />,
  document.getElementById("root")
)
`.trim();

  const projectDependencies = {
    ...dependencies,
    react: '16.8.0',
    'react-dom': '16.8.0',
    '@papanasi/react': `${lernaJson.version}`
  };

  const devDependencies = {
    'react-scripts': 'latest'
  };

  const { url } = generateCodeSandboxLink({
    html,
    demoCode,
    dependencies: projectDependencies,
    devDependencies
  });

  return { url, content: previewCode };
}
