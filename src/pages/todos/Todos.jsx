import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  decrementCounter,
  incrementCounter,
  rndCounter,
  todosActions,
} from './_store/init';
import { getCounter, getTodosSlice } from './_store/selectors';
import { asyncCounterAction, fetchTodosAction } from './_store/thunks';

export const Todos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchTodosAction());
    }, 1000);
  }, []);

  const { todos, error, isPending } = useSelector(getTodosSlice);
  const counter = useSelector(getCounter);

  return (
    <div>
      <h1>Page</h1>

      <br />
      <hr />
      <br />

      <h2>Todos</h2>
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {todos && (
        <ul>
          {todos.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      )}

      <br />
      <hr />
      <br />

      <h2>Counter: {counter}</h2>
      <button onClick={() => dispatch(decrementCounter.ac())}>-1</button>
      <button
        onClick={() => {
          const sign = Math.random() > 0.5 ? 1 : -1;
          const value = Math.round(Math.random() * 9 + 1) * sign;

          dispatch(rndCounter.ac(value));
        }}
      >
        rnd
      </button>
      <button onClick={() => dispatch(incrementCounter.ac())}>+1</button>
      <button onClick={() => dispatch(asyncCounterAction())}>async +10</button>
      <hr />
      <button onClick={() => dispatch(todosActions.decrementCounter())}>
        -1
      </button>
      <button
        onClick={() => {
          const sign = Math.random() > 0.5 ? 1 : -1;
          const value = Math.round(Math.random() * 9 + 1) * sign;

          dispatch(todosActions.rndCounter(value));
        }}
      >
        rnd
      </button>
      <button onClick={() => dispatch(todosActions.incrementCounter())}>
        +1
      </button>
      <button onClick={() => dispatch(asyncCounterAction())}>async +10</button>
    </div>
  );
};
