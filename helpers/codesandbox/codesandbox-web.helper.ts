import lernaJson from '../../lerna.json';
import { generateCodeSandboxLink } from './codesandbox.helper';

export function generateWebCodeSandboxLink(options) {
  const { components, extensions, code, dependencies } = options;

  const html = `<div class="app">${code}</div>
<script src="index.js"></script>
`;

  const demoCode = `
import "@webcomponents/custom-elements/src/native-shim.js";
import "@webcomponents/custom-elements/custom-elements.min";
import "@papanasi/webcomponents/dist/papanasi.css";
import './index.css';

/** Note: In web components the CSS selectors are different because the shadow DOM is used.
*   Instead of .pa-row.is-error you should use pa-row::part(pa-row is-error)
*/

import { ${components.join(', ')} ${components.length > 0 && extensions.length > 0 ? ', ' : ''}${extensions.join(
    ', '
  )} } from '@papanasi/webcomponents';


${[...extensions, ''].join('(); \n')}
`.trim();

  const previewCode = `// index.js
import { ${components.join(', ')} ${components.length > 0 && extensions.length > 0 ? ', ' : ''}${extensions.join(
    ', '
  )} } from '@papanasi/webcomponents';
import "@papanasi/webcomponents/dist/papanasi.css";


${[...extensions, ''].join('(); \n')}

// index.html
${code}
`;

  const projectDependencies = {
    ...dependencies,
    '@webcomponents/custom-elements': '1.5.0',
    '@papanasi/webcomponents': `${lernaJson.version}`
  };

  const devDependencies = {
    '@babel/core': '7.2.0',
    typescript: '4.4.4',
    'parcel-bundler': '^1.6.1'
  };

  const packageJson = {
    scripts: {
      start: 'parcel index.html --open'
    }
  };

  const { url } = generateCodeSandboxLink({
    html,
    demoCode,
    dependencies: projectDependencies,
    devDependencies,
    packageJson
  });

  return { url, content: previewCode };
}
