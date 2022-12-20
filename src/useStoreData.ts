import { useRef } from 'react';
import { createStore } from './createStore';
import { REDUCER } from './types/types';

/**
 * Custom hook to keep track of the data (current state). This hooks also uses the createStore fn to create a new store (pub/sub pattern).
 */
export const useStoreData = <T, ACTION = unknown>(initData: T, reducer?: REDUCER<T, ACTION>) => {
  const storeData = useRef(initData);

  const { subscribe, publish, getState, publishToReducer } = createStore<T, ACTION>(storeData, reducer);

  return {
    subscribe,
    publish,
    getState,
    publishToReducer,
  };
};
