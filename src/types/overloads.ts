import { REDUCER } from './types';

export type CreateGlobalContextOverloads = {
  <T>(initState: T): {
    Provider: ({ children, initialState }: { children: JSX.Element | JSX.Element[]; initialState?: T }) => JSX.Element;
    useStore: useStoreWithOutReducerOverloads<T>;
    useSet: () => PublishOverloads<T>;
    useDispatch: () => PublishOverloads<T>;
  };
  <STATE, ACTION>(initState: STATE, reducer: REDUCER<STATE, ACTION>): {
    Provider: ({
      children,
      initialState,
      initialReducer,
    }: {
      children: JSX.Element | JSX.Element[];
      initialState?: STATE;
      initialReducer?: REDUCER<STATE, ACTION>;
    }) => JSX.Element;
    useStore: useStoreReducerOverloads<STATE, ACTION>;
    useSet: () => (action: ACTION) => void;
    useDispatch: () => (action: ACTION) => void;
  };
};

export type useStoreOverloads<T, ACTION = undefined> = {
  (): [T, PublishOverloads<T> | ((action: ACTION) => void)];
  <SELECTOR>(selector: (state: T) => SELECTOR): [SELECTOR, PublishOverloads<T> | ((action: ACTION) => void)];
};

export type useStoreWithOutReducerOverloads<T> = {
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
