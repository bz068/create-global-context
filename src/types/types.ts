import { useStoreData } from '../useStoreData';

export type REDUCER<STATE, ACTION> = (state: STATE, action: ACTION) => Partial<STATE>;

export type useStoreDataReturnType<T, A = void> = ReturnType<typeof useStoreData<T, A>>;
