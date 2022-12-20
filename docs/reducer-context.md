# Usage with Reducers

You also have the ability to use reducers while working with context created with `createGlobalContext`. In order to achieve this, you need to pass `reducer` as the second argument to `createGlobalContext`; i.e. `createGlobalContext({ name: 'Context', id: 1, count: 1 }, reducer)`.
The `reducer` of course has to be of type `function` and takes two arguments; the first argument is the `state` and the second argument is the `action`. Below is an example of how it works;

```
type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset'; payload: number };

function reducer(state: State, action: Action) {
   switch (action.type) {
      case 'increment':
         return { ...state, count: state.count + 1 };
      case 'decrement':
         return { ...state, count: state.count - 1 };
      case 'reset':
         return { ...state, count: action.payload };
      default:
         throw new Error();
   }
}
```

To display the state and set to the state:

```
function Counter() {
   const [count, dispatch] = useStore((state) => state.count);
   return (
      <>
         <p> Count: {count}</p>
         <button onClick={() => dispatch({ type: 'reset', payload: 0 })}>Reset</button>
         <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
         <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      </>
   );
}
```

`useStore` also supports `selectors` while working with reducers. Just pass in a callback to `useStore` to select something specific from the store. _if you do not pass in a cb to useStore, the whole state will be returned, and on any state change, component will re-render._

## Updating the Store

If you have a component which _DOESN'T_ use the store but does set to the store, then you should use the `useSet` hook returned by `createGlobalContext`, this is to avoid the re-render of the component.

:warning: It also works without `Reducers`.

```
const { Provider, useStore, useSet } = createGlobalContext({ name: 'Context', id: 1, count: 1 }, reducer);
```

The `useSet` hook returns a function which behaves similar to the setter function returned by `useStore`.

```
const CountWithSet = () => {
   const set = useSet();
   return <button onClick={() => set({ type: 'decrement' })}>ADD</button>;
};
```

`set` function will take the `action` as a parameter.
