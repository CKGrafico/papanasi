import { debug } from '~/helpers';
import { toastBus } from './toast.bus';
import './toast.css';
import { ToastPayload } from './toast.model';

const themes = {};

const actions: {
  [key: string]: (payload: ToastPayload) => void;
} = {};

function actionFactory(name) {
  return (payload: ToastPayload) => {
    toastBus.publish({
      id: `${Math.random()}`,
      ...payload
    });
  };
}

function createTheme(name: string) {
  const properties = ['background', 'foreground'];
  const theme = {};

  properties.forEach((property) => (theme[property] = `var(--pa-toast-${property}-${name})`));

  debug(`ToastService createTheme: ${name}: ${JSON.stringify(theme)}`);

  toastBus.register();
  themes[name] = theme;
  actions[name] = actionFactory(name);
}

function triggerCustomAction(name: string, payload: ToastPayload) {
  return actions[name](payload);
}

export default function useToastExtension() {
  createTheme('success');
  createTheme('error');

  return { success: actions.success, error: actions.error, createTheme, trigger: triggerCustomAction };
}
