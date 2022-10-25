import { useRef } from 'react';
import { createStore } from './createStore';

/**
 * Custom hook to keep track of the data (current state). This hooks also uses the createStore fn to create a new store (pub/sub pattern).
 */
export const useStoreData = <T>(initData: T) => {
  const storeData = useRef(initData);

  const { subscribe, publish, getState } = createStore<T>(storeData);

  return {
    subscribe,
    publish,
    getState,
  };
};

export type useStoreDataReturnType = ReturnType<typeof useStoreData>;
