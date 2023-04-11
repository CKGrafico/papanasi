import { getDocument } from 'ssr-window';
import { debug } from '~/helpers';
import './toast.css';

const themes = {};
const methods = {};

function methodFactory(name) {
  return () => console.log(1);
}

function createTheme(name: string) {
  const properties = ['background', 'foreground'];
  const theme = {};

  properties.forEach((property) => (theme[property] = `var(--pa-toast-${property}-${name})`));

  debug(`ToastService createTheme: ${name}: ${JSON.stringify(theme)}`);

  themes[name] = theme;
  methods[name] = methodFactory(name);
}

export default function useTooltipExtension(rootElement?: HTMLElement) {
  const document = getDocument();
  const element = rootElement || document.body;

  createTheme('success');
  createTheme('error');

  return { ...methods };
}
