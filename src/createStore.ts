import { PublishOverloads } from './types/overloads';
import { REDUCER } from './types/types';

/**
 * The purpose of this function is to provide a pub/sub interface to the useStoreData hook.The logic in this function should be able to inform the
 * subscribers of any state change, and also allow consumers to update the state, get the state.
 */
export const createStore = <STATE, ACTION>(storeRef: { current: STATE }, reducer?: REDUCER<STATE, ACTION>) => {
  const subscribers = new Set<(args: STATE) => void>();

  const subscribe = (sb: (args: STATE) => void) => {
    subscribers.add(sb);
    return () => subscribers.delete(sb);
  };

  const publish: PublishOverloads<STATE> = (newState: unknown) => {
    const newVal = typeof newState === 'function' ? newState(storeRef.current) : newState;
    storeRef.current = { ...storeRef.current, ...newVal };
    subscribers.forEach((sb) => sb(storeRef.current));
  };

  const publishToReducer = (action: ACTION) => {
    if (reducer) {
      storeRef.current = reducer(storeRef.current, action) as STATE;
      subscribers.forEach((sb) => sb(storeRef.current));
    }
  };

  const getState = () => storeRef.current;

  return {
    subscribe,
    publish,
    getState,
    publishToReducer,
  };
};
