## Getting Started with TypeScript

The `createGlobalContext` function is a generic, the function will infer the global context state shape from its argument.

```
const { Provider, useStore } = createGlobalContext({
  name: "Context",
  id: 1,
  count: 1
});
```

> This code will infer the state has a shape of:

```
(initState: {
    name: string;
    id: number;
    count: number;
}
)
```

> ** But for extra safe type checking we can pass the shape of state as a generic (\<SATE>) to `createGlobalContext` function. **

First lets make an interface to showcase the shape of state.

```
interface IState {
  name: string;
  id?: number;
  count: number;
}
```

Then we simply pass the interface to `createGlobalContext`.

```
const { Provider, useStore } = createGlobalContext<IState>({
    name: "Context",
    id: 1,
    count: 1
});
```

Thats it!
