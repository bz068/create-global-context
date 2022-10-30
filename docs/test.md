# Testing components

> which uses the global context.

## Testing components

Testing components is very simple with create-global-context. All that needs to be done is to wrap the component in `Provider` and the components will have access to the context data.

> In order to be able to test we need to wrap the component in `Provider` because we are testing each of the components on its own.
> **PLEASE NOTE: Please make sure the component is using `useStore` and the `Provider` returned by `createGlobalContext instance`**

> We also need to give the Context an initial state to work with that way we can test with the data that is being passed in test suites. In order to test, we need to pass the state as `initialState` prop to the `Provider`.

```
    <Provider initialState={state}>
        .....
    </Provider>
```

### So first thing first, we will need to export the `Provider` component from where the context is created.

**Below examples are done using the testing library**

```
const { Provider, useStore } = createGlobalContext({ name: 'Context', id: 1, count: 1 })
....
export { Provider }
```

### In this example we will be testing these two components which are subscribed to context

```
const NameComponent = () => {
  const [name] = useStore((state) => state.name);
  return <div>{name}</div>;
};

const Count = () => {
  const [count, setStore] = useStore((state) => state.count);
  return (
    <div>
      <p id="count-component">{count}</p>
      <button
        onClick={() =>
          setStore((currentState) => ({ count: currentState.count + 1 }))
        }
      >
        ADD
      </button>
    </div>
  );
};
```

### Let's a write a render helper function

This function will take state and pass it to the `Provider` as `initialState` prop, and the component that needs to be rendered, and return the returned value of render function
`render` comes from `@testing-library/react`

```
const setUp = (state, Component) =>
    render(
      <Provider initialState={state}>
        <Component />
      </Provider>
    );
```

### Finally we write our tests

```

  it("Name should match value in context", async () => {
    const { container } = setUp({ name: "Context", id: 2 }, NameComponent);
    const div = container.querySelector("div");
    expect(div).toHaveTextContent("Context");
  });

  it("Count should update in the context", async () => {
    const { container } = setUp({ name: "Context", count: 1 }, Count);
    const p = container.querySelector("p");
    expect(p).toHaveTextContent("1");
    await userEvent.click(screen.getByRole("button"));
    expect(p).toHaveTextContent("2");
    await userEvent.click(screen.getByRole("button"));
    expect(p).toHaveTextContent("3");
  });
```

## This is the complete test file

[Live demo - CodeSandBox](https://codesandbox.io/s/blue-rgb-9h1zmx?file=/src/app.test.js)

```
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { NameComponent, Provider, Count } from "./App";

describe("name", () => {
  const setUp = (state, Component) =>
    render(
      <Provider initialState={state}>
        <Component />
      </Provider>
    );

  it("Name should match value in context", async () => {
    const { container } = setUp({ name: "Context", id: 2 }, NameComponent);
    const div = container.querySelector("div");
    expect(div).toHaveTextContent("Context");
  });

  it("Count should update in the context", async () => {
    const { container } = setUp({ name: "Context", count: 1 }, Count);
    const p = container.querySelector("p");
    expect(p).toHaveTextContent("1");
    await userEvent.click(screen.getByRole("button"));
    expect(p).toHaveTextContent("2");
    await userEvent.click(screen.getByRole("button"));
    expect(p).toHaveTextContent("3");
  });
});
```

## The above test cases would look something like this for `Enzyme`

```
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { NameComponent, Provider, Count } from "./App";

Enzyme.configure({ adapter: new Adapter() });

describe("name", () => {
  const setUp = (state, Component) =>
    mount(
      <Provider initialState={state}>
        <Component />
      </Provider>
    );

  it("Name should match value in context", async () => {
    const wrapper = setUp({ name: "Context", id: 2 }, NameComponent);
    const div = wrapper.find("div");
    expect(div.text()).toBe("Context");
  });

  it("Count should update in the context", async () => {
    const wrapper = setUp({ name: "Context", count: 1 }, Count);
    const p = wrapper.find("p");
    expect(p.text()).toBe("1");
    wrapper.find("button").props().onClick();
    expect(p.text()).toBe("2");
    wrapper.find("button").props().onClick();
    expect(p.text()).toBe("3");
  });
});

```
