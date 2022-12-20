export type REDUCER<STATE, ACTION> = (state: STATE, action: ACTION) => Partial<STATE>;
