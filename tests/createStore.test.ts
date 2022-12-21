import { describe, expect, test } from '@jest/globals';
import { createStore } from '../src/createStore';

type State = {
  count: number;
  name: string;
};

type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset'; payload: number };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'reset':
      return { ...state, count: action.payload };
    default:
      throw new Error();
  }
};

describe('createStore', () => {
  const useRefClone = { current: { count: 1, name: 'Context' } };

  test('getState function should working as expected', () => {
    const store = createStore(useRefClone);
    expect(store.getState()).toBe(useRefClone.current);
  });

  test('subscribe and publish should be working as expected', () => {
    let state;
    const store = createStore(useRefClone);
    store.subscribe((newState) => (state = newState));
    store.publish((state) => ({ count: state.count + 1 }));
    expect(state).toEqual({ count: 2, name: 'Context' });
    expect(store.getState()).toEqual({ count: 2, name: 'Context' });
  });

  test('subscribe and publish should be working as expected with reducer', () => {
    let state;
    const store = createStore(useRefClone, reducer);
    store.subscribe((newState) => (state = newState));
    store.publishToReducer({ type: 'increment' });
    expect(state).toEqual({ count: 3, name: 'Context' });
    expect(store.getState()).toEqual({ count: 3, name: 'Context' });
  });
});
