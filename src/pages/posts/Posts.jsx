import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postsActions } from './_store';
import { selectCounter, selectPostsSlice } from './_store/selectors';

export const Posts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(postsActions.fetchPostsAction());
    }, 1000);
  }, []);

  const { data, error, isPending } = useSelector(selectPostsSlice);
  const counter = useSelector(selectCounter);

  return (
    <div>
      <h1>Page</h1>

      <br />
      <hr />
      <br />

      <h2>Posts</h2>
      {isPending && <div>Loading...</div>}
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
      <button onClick={() => dispatch(postsActions.decrementCounterAction())}>
        -1
      </button>
      <button
        onClick={() => {
          const sign = Math.random() > 0.5 ? 1 : -1;
          const value = Math.round(Math.random() * 9 + 1) * sign;

          dispatch(postsActions.setCounterAction(value));
        }}
      >
        rnd
      </button>
      <button onClick={() => dispatch(postsActions.incrementCounterAction())}>
        +1
      </button>
      <button onClick={() => dispatch(postsActions.asyncCounterAction())}>
        async +10
      </button>
    </div>
  );
};
