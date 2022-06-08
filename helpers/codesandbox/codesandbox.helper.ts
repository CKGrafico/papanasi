import LZString from 'lz-string';

export function toBase64(string: string) {
  return LZString.compressToBase64(string).replace(/\+/g, `-`).replace(/\//g, `_`).replace(/=+$/, ``);
}

export function generateCodeSandboxLink(options) {
  const { html, demoCode, dependencies, devDependencies } = options;

  const css = `
.app {
  --pa-grid-gutter: 0.15rem;
  --pa-color-primary-normal: #017af0;

  padding-top: 1rem;
}

.footer {
  font-size: 0.8rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  justify-content: flex-end;
  margin-top: 1rem;
  text-align: right;
}

  `;

  const content = `
import './index.css';
${demoCode}
`;

  const parameters = {
    files: {
      'package.json': {
        content: {
          dependencies,
          devDependencies
        }
      },
      'index.html': {
        content: `
${html}
<div class="footer">
  <a href="https://papanasi.js.org" target="_blank" rel="noreferrer">
    Visit the docs at papanasi.js.org
  </a>
</div>
        `
      },
      'index.css': {
        content: css
      },
      'index.js': {
        content
      }
    }
  };

  const urlParams = toBase64(JSON.stringify(parameters));

  return { url: `https://codesandbox.io/api/v1/sandboxes/define?parameters=${urlParams}`, content: demoCode };
}
