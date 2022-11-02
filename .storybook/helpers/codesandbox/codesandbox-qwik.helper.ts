import lernaJson from '../../../lerna.json';

export function generateQwikCodeSandboxLink(options) {
  const { components, extensions, code, dependencies } = options;

  const previewCode = `import { ${components.join(', ')} ${
    components.length > 0 && extensions.length > 0 ? ', ' : ''
  }${extensions.join(', ')} } from '@papanasi/qwik';
import '@papanasi/qwik/style.css';
import '@papanasi/qwik/papanasi.css';${[...extensions, ''].join('(); \n')}

export default component$(() => {
  return (${code}
  <!-- Temporal url meanwhile codesandbox works -->
  );
});
`;

  const demoCode = `import { Component, render } from "qwik";

${previewCode}

render(<App />, document.getElementById("root"));
`.trim();

  const projectDependencies = {
    ...dependencies,
    '@builder.io/qwik': '0.9.0',
    '@papanasi/qwik': `${lernaJson.version}`,
    'highlight.js': '^11.6.0'
  };

  const devDependencies = {
    'preact-cli': '^1.4.1'
  };

  // const { url } = generateCodeSandboxLink({
  //   demoCode,
  //   dependencies: projectDependencies,
  //   devDependencies
  // });

  // Temporal url meanwhile https://github.com/BuilderIO/qwik/issues/1644
  const url =
    'https://stackblitz.com/edit/qwik-starter-i6prxe?file=src%2Fglobal.css,src%2Froot.tsx,package.json,vite.config.ts';

  return { url, content: previewCode };
}
