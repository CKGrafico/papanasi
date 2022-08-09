import lernaJson from '../../lerna.json';
import { generateCodeSandboxLink } from './codesandbox.helper';

export function generateSvelteCodeSandboxLink(options) {
  const { components, extensions, code, dependencies } = options;

  const html = `<div class="app" id="app"></div>`;

  const previewCode = `<script>
import { ${components.join(', ')} ${components.length > 0 && extensions.length > 0 ? ', ' : ''}${extensions.join(
    ', '
  )} } from '@papanasi/svelte';
import "@papanasi/svelte/dist/papanasi.css";
import "./index.css";${[...extensions, ''].join('(); \n')}
</script>
${code}
`;

  const demoCode = `import App from "./App.svelte";

const app = new App({
  target: document.querySelector("#app")
});

export default app;
`.trim();

  const extraFiles = {
    'App.svelte': {
      content: previewCode
    }
  };

  const projectDependencies = {
    ...dependencies,
    svelte: '^3.32.3',
    '@papanasi/svelte': `${lernaJson.version}`
  };

  const devDependencies = {
    'npm-run-all': '^4.1.5',
    rollup: '^1.10.1',
    'rollup-plugin-commonjs': '^9.3.4',
    'rollup-plugin-node-resolve': '^4.2.3',
    'rollup-plugin-svelte': '^6.1.1',
    'rollup-plugin-terser': '^4.0.4',
    'sirv-cli': '^0.3.1'
  };

  const packageJson = {
    scripts: {
      autobuild: 'rollup -c -w',
      dev: 'run-p start:dev autobuild',
      start: 'sirv public',
      'start:dev': 'sirv public --dev'
    }
  };

  const { url } = generateCodeSandboxLink({
    html,
    demoCode,
    dependencies: projectDependencies,
    devDependencies,
    packageJson,
    publicFolder: 'public/',
    extraFiles
  });

  return { url, content: previewCode };
}
