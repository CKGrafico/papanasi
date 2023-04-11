import { getDocument } from 'ssr-window';
import { debug } from '~/helpers';
import { toastBus } from './toast.bus';
import './toast.css';

const themes = {};
const actions: any = {};

function actionFactory(name) {
  return (options: any) => {
    console.log('action triggered');
    toastBus.publish('ACTIONNNNNN', options);
  };
}

function createTheme(name: string) {
  const properties = ['background', 'foreground'];
  const theme = {};

  properties.forEach((property) => (theme[property] = `var(--pa-toast-${property}-${name})`));

  debug(`ToastService createTheme: ${name}: ${JSON.stringify(theme)}`);

  toastBus.register('ACTIONNNNNN', { type: Object });
  themes[name] = theme;
  actions[name] = actionFactory(name);

  setTimeout(() => {
    toastBus.subscribe('ACTIONNNNNN', () => console.log(11111));
  }, 1000);
}

function triggerCustomAction(name: string, options: any) {
  return actions[name](options);
}

export default function useTooltipExtension(rootElement?: HTMLElement) {
  const document = getDocument();
  const element = rootElement || document.body;

  createTheme('success');
  createTheme('error');

  return { success: actions.success, error: actions.error, createTheme, trigger: triggerCustomAction };
}
