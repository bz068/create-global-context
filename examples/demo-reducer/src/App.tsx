import './App.css';
import { createGlobalContext } from 'create-global-context';

type State = {
  count: number;
  name: string;
};

type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset'; payload: number };

const reducer = (state: State, action: Action) => {
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
};

const { Provider, useStore, useDispatch } = createGlobalContext(
  {
    name: 'Context',
    id: 1,
    count: 1,
  },
  reducer,
);

export default function App() {
  return (
    <Provider>
      <div className="App">
        <NameComponent />
        <Count />
        <JustCount />
        <hr />
        <p>useDispatch</p>
        <CountAdder />
      </div>
    </Provider>
  );
}

const NameComponent = () => {
  const [name] = useStore((state) => state.name);
  return <div>{name}</div>;
};
const Count = () => {
  const [count, dispatch] = useStore((state) => state.count);
  return (
    <div>
      <p id="count-component">{count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>ADD</button>
    </div>
  );
};
const CountAdder = () => {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch({ type: 'increment' })}>ADD</button>;
};

const JustCount = () => {
  const [count] = useStore((state) => state.count);
  return <div id="just-count">{count}</div>;
};

export { Provider, NameComponent, Count, JustCount };
