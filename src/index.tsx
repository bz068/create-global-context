import React, { createContext, useContext, useSyncExternalStore } from 'react';
import { PublishOverloads } from './createStore';
import { useStoreData, useStoreDataReturnType } from './useStoreData';

type useStoreOverloads<T> = {
  (): [T, PublishOverloads<T>];
  <SELECTOR>(selector: (state: T) => SELECTOR): [SELECTOR, PublishOverloads<T>];
};

/**
 * The purpose of this function is to create the initial state store, create a Provider component to wrap around all
 * elements that will be used to access the store data.
 */

export const createGlobalContext = <STATE,>(initState: STATE) => {
  const StoreContext = createContext<useStoreDataReturnType | null>(null);

  const Provider = ({ children, initialState }: { children: JSX.Element | JSX.Element[]; initialState?: STATE }) => {
    return <StoreContext.Provider value={useStoreData<STATE>(initialState || initState)}>{children}</StoreContext.Provider>;
  };

  const useStore: useStoreOverloads<STATE> = (selector = (state: STATE) => state) => {
    const storeContext = useContext(StoreContext);
    if (!storeContext) throw new Error('No Context store provided');
    const store = useSyncExternalStore(storeContext.subscribe, () => selector(storeContext.getState() as STATE));
    return [store, storeContext.publish] as [ReturnType<typeof selector>, PublishOverloads<STATE>];
  };

  return {
    Provider,
    useStore,
  };
};
