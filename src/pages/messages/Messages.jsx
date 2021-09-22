import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  actions,
  decrementCounter,
  incrementCounter,
  rndCounter,
} from './_store/init';
import { getCounter, getMessagesSlice } from './_store/selectors';
import { asyncCounterAction, fetchMessagesAction } from './_store/thunks';

export const Messages = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchMessagesAction());
    }, 1000);
  }, []);

  const { data, error, isFetching } = useSelector(getMessagesSlice);
  const counter = useSelector(getCounter);

  return (
    <div>
      <h1>Page</h1>

      <br />
      <hr />
      <br />

      <h2>Messages</h2>
      {isFetching && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {data && (
        <ul>
          {data.map((item) => (
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
      <button onClick={() => dispatch(actions.decrementCounter())}>-1</button>
      <button
        onClick={() => {
          const sign = Math.random() > 0.5 ? 1 : -1;
          const value = Math.round(Math.random() * 9 + 1) * sign;

          dispatch(actions.rndCounter(value));
        }}
      >
        rnd
      </button>
      <button onClick={() => dispatch(actions.incrementCounter())}>+1</button>
      <button onClick={() => dispatch(asyncCounterAction())}>async +10</button>
    </div>
  );
};
