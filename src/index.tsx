import React, { createContext, useContext } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { CreateGlobalContextOverloads, PublishOverloads, useStoreOverloads } from './types/overloads';
import { REDUCER, useStoreDataReturnType } from './types/types';
import { useStoreData } from './useStoreData';

/**
 * The purpose of this function is to create the initial state store, create a Provider component to wrap around all
 * elements that will be used to access the store data.
 */

export const createGlobalContext: CreateGlobalContextOverloads = <STATE, ACTION>(initState: any, reducer?: any) => {
  const StoreContext = createContext<useStoreDataReturnType<STATE, ACTION> | null>(null);

  const Provider = ({
    children,
    initialState,
    initialReducer,
  }: {
    children: JSX.Element | JSX.Element[];
    initialState?: STATE;
    initialReducer?: REDUCER<STATE, ACTION>;
  }) => {
    return <StoreContext.Provider value={useStoreData<STATE, ACTION>(initialState || initState, initialReducer || reducer)}>{children}</StoreContext.Provider>;
  };

  const useStore: useStoreOverloads<STATE, ACTION> = (selector = (state: STATE) => state) => {
    const storeContext = useContext(StoreContext);
    if (!storeContext) throw new Error('No Context store provided. Did you wrap the App inside the Provider?');
    const store = useSyncExternalStore(storeContext.subscribe, () => selector(storeContext.getState() as STATE));
    if (reducer) {
      return [store, storeContext.publishToReducer] as [ReturnType<typeof selector>, (action: ACTION) => void];
    } else {
      return [store, storeContext.publish] as [ReturnType<typeof selector>, PublishOverloads<STATE>];
    }
  };

  const useSet = () => {
    const storeContext = useContext(StoreContext);
    if (!storeContext) throw new Error('No Context store provided. Did you wrap the App inside the Provider?');
    if (reducer) {
      return storeContext.publishToReducer;
    } else {
      return storeContext.publish;
    }
  };

  return {
    Provider,
    useStore,
    useSet,
  };
};
