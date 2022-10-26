# Better way to work with React Context,

## The create-global-context way!

![NPM](https://img.shields.io/npm/l/create-global-context)

**BETA version, still in DEVELOPMENT**

## The why?

Wanting to have react components in sync with each other could be a little overwhelming sometimes. We could lift up the state and drift the state down the component tree recursively through component props till we get the state down to where we desire `prop-drilling`.

Here is where React Context comes to play, by keeping all pages and components in sync. But the problem with React Context is that when not used with caution it can be quite confusing. For example, when the context changes, the the useContext will cause a re-render even if the component is not using the changed value, causing performance issues.

There are many solutions to this problem, but the preferred solution is to `split the context`. This is where you would need to put variables that change a lot into a different context, this way you can have some optimization as not all components using context will re-render, since the components will be using different context. This could mean having many different contexts and many providers around your `App` component, which could be a bit messy in my opinion.

The reason for this solution `create-global-context` is to have one Context and one Provider. To make sure that all components do not re-render and only re-render those components which are using the value from the context which has changed. This is achieved by using `selectors`.

## Getting Started

The Package can be installed from NPM

```
npm i create-global-context

npm install create-global-context
```

### Usage

##### The first step is to import `createGlobalContext`

```
import { createGlobalContext } from 'create-global-context'
```

##### The second step is to create a global context

> createGlobalContext takes one argument; which is the initial state, or the shape of the state.
> createGlobalContext returns a Provider component wrapper which wraps around components which will be using the context, and useStore hook to get and modify the state.

```
const { Provider, useStore } = createGlobalContext({ name: 'Context', id: 1, count: 1 })
```

##### The third step is to use the Provider

> wrap the Provider around components which will be using the context.

```
function App() {
  return (
    <Provider>
      <>
        <NameComponent />
        <Count />
      </>
    </Provider>
  )
}
```

#### Finally step four; we use the useStore.

> in order to get the store or make changes to the store we will be using useStore hook returned by the createGlobalContext fn in `step 2`.
> useStore hook returns a tuple, index 0 is the state itself, index 1 is the setter function.

without the setter function

```
const NameComponent = () => {
  const [state] = useStore()
  return <div>{state.name}</div>
}
```

with setter function

```
const Count = () => {
  const [state, setStore] = useStore()
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => setStore({ count: state.count + 1 })}>ADD</button>
    </div>
  )
}
```

The setStore function returned by useStore hook can be used in `two` ways. First way to pas in the object with what you want to change or update and second way is to pass in a callback function which takes the current state as the first argument. Very similar behavior to useState hook.

**First Method**

```
<button onClick={() => setStore({ count: state.count + 1 })}>ADD</button>
```

**Second Method**

```
<button onClick={() => setStore((currentState) => ({ count: currentState.count + 1 }))}>ADD</button>
```

## Avoiding unnecessary re-render - Selectors

In order to avoid the unnecessary re-renders there is one more step to follow. Quite Simply pass in a `callback` function to the `useStore` hook to get what we want from the store instead of the whole store state itself, which will cause a re-render and we do not want that.
By using `selectors` the component will only render if that the piece of state changes to which that specific component is being subscribed to.

### Step 4 from `Usage` would look something like this;

without setter function

```
const NameComponent = () => {
  const [name] = useStore((state => state.name))
  return <div>{name}</div>
}
```

with setter function

```
const Count = () => {
  const [count, setStore] = useStore((state) => state.count)
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setStore((currentState) => ({ count: currentState.count + 1 }))}>ADD</button>
    </div>
  )
}
```

## Useful links

[JavaScript Example - CodeSandBox](https://codesandbox.io/s/blue-rgb-9h1zmx)
[TypeScript Example - CodeSandBox](https://codesandbox.io/s/peaceful-noyce-0ddvlh)
