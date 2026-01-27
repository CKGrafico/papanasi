import { EventBus } from '@trutoo/event-bus';
import { ToastCallback, ToastPayload, ToastSubscription } from './toast.model';

const BUS_NAME = 'toast';
const bus = new EventBus();
const state: ToastPayload[] = [];

// TODO: If more buses in the future, move to generic
const subscribe = (callback: ToastCallback<ToastPayload>): ToastSubscription => {
  let subscription: ToastSubscription | null = null;

  void bus.subscribe(BUS_NAME, callback).then((next) => {
    subscription = next;
  });

  return {
    unsubscribe: () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  };
};
const register = (optionsType = { type: Object }) => bus.register(BUS_NAME, optionsType);
const publish = (payload: ToastPayload) => {
  state.push(payload);
  bus.publish(BUS_NAME, payload);
};

// TODO: Can i move all the logic to the service??

export const toastBus = {
  subscribe,
  register,
  publish,
  state: () => state
};
