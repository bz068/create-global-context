# Better way to work with React Context,

## The create-global-context way!

![NPM](https://img.shields.io/npm/l/create-global-context)

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

> createGlobalContext takes one argument; which is the initial state, or the shape of the state
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
