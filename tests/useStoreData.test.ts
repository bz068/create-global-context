import { describe, expect, test, beforeEach } from '@jest/globals';
import React from 'react';
import { useStoreData } from '../src/useStoreData';

describe('useStoreData', () => {
  const state = { count: 1, name: 'Context' };

  beforeEach(() => {
    jest.spyOn(React, 'useRef').mockReturnValue({
      current: {
        ...state,
      },
    });
  });

  test('getState function should working as expected - useStoreData', () => {
    const store = useStoreData(state);
    expect(store.getState()).toEqual(state);
  });

  test('subscribe and publish should be working as expected - useStoreData', () => {
    let state;
    const store = useStoreData(state);
    store.subscribe((newState) => (state = newState));
    store.publish((state) => ({ count: state.count + 1 }));
    expect(state).toEqual({ count: 2, name: 'Context' });
    expect(store.getState()).toEqual({ count: 2, name: 'Context' });
  });
});
