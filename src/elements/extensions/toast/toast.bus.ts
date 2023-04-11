import { EventBus } from '@trutoo/event-bus';
import { ToastCallback, ToastPayload } from './toast.model';

const BUS_NAME = 'toast';
const bus = new EventBus();

// TODO: If more buses in the future, move to generic
const subscribe = (callback: ToastCallback<ToastPayload>) => bus.subscribe(BUS_NAME, callback);
const register = (optionsType = { type: Object }) => bus.register(BUS_NAME, optionsType);
const publish = (payload: ToastPayload) => bus.publish(BUS_NAME, payload);

export const toastBus = {
  subscribe,
  register,
  publish
};
