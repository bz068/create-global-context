import './App.css';
import { createGlobalContext } from 'create-global-context';
const { Provider, useStore } = createGlobalContext({
  name: 'Context',
  id: 1,
  count: 1,
});

export default function App() {
  return (
    <Provider>
      <div className="App">
        <NameComponent />
        <Count />
        <JustCount />
      </div>
    </Provider>
  );
}

const NameComponent = () => {
  const [name] = useStore((state) => state.name);
  return <div>{name}</div>;
};
const Count = () => {
  const [count, setStore] = useStore((state) => state.count);
  return (
    <div>
      <p id="count-component">{count}</p>
      <button onClick={() => setStore((currentState) => ({ count: currentState.count + 1 }))}>ADD</button>
    </div>
  );
};

const JustCount = () => {
  const [count] = useStore((state) => state.count);
  return <div id="just-count">{count}</div>;
};

export { Provider, NameComponent, Count, JustCount };
