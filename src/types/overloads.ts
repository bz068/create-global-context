import { REDUCER } from './types';

export type CreateGlobalContextOverloads = {
  <T>(initState: T): {
    Provider: ({ children, initialState }: { children: JSX.Element | JSX.Element[]; initialState?: T }) => JSX.Element;
    useStore: useStoreOverloads<T>;
  };
  <STATE, ACTION>(initState: STATE, reducer: REDUCER<STATE, ACTION>): {
    Provider: ({ children, initialState }: { children: JSX.Element | JSX.Element[]; initialState?: STATE }) => JSX.Element;
    useStore: useStoreReducerOverloads<STATE, ACTION>;
  };
};

export type useStoreOverloads<T> = {
  (): [T, PublishOverloads<T>];
  <SELECTOR>(selector: (state: T) => SELECTOR): [SELECTOR, PublishOverloads<T>];
};

export type useStoreReducerOverloads<T, ACTION> = {
  (): [T, (action: ACTION) => void];
  <SELECTOR>(selector: (state: T) => SELECTOR): [SELECTOR, (action: ACTION) => void];
};

export type PublishOverloads<T> = {
  (newState: Partial<T>): void;
  <FN extends (state: T) => Partial<T>>(newState: FN): void;
};
