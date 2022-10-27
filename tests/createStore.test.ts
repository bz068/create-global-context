import { describe, expect, test } from '@jest/globals';
import { createStore } from '../src/createStore';

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
});
