import { useDispatch, useSelector } from 'react-redux';

import {
  asyncSetCounter,
  decrementCounter,
  fetchPosts,
  incrementCounter,
  selectCounter,
  selectPosts,
} from './_store';

export const Posts = () => {
  const counter = useSelector(selectCounter);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Posts</h2>
      {posts.isPending && <small>Loading...</small>}
      {posts.error && <small>Error: {posts.error}</small>}
      {posts.data ? (
        <ul>
          {posts.data.map(({ id, name, text }) => (
            <li key={id}>
              {name}: {text}
            </li>
          ))}
        </ul>
      ) : (
        <button
          disabled={posts.isPending}
          onClick={() => dispatch(fetchPosts())}
        >
          get
        </button>
      )}

      <hr />

      <h2>Counter: {counter.data}</h2>
      {counter.isPending && <small>Loading...</small>}
      {counter.error && <small>Error: {counter.error}</small>}
      <div>
        <button onClick={() => dispatch(decrementCounter())}>dec</button>
        <button
          disabled={counter.isPending}
          onClick={() => dispatch(asyncSetCounter())}
        >
          async
        </button>
        <button onClick={() => dispatch(incrementCounter())}>inc</button>
      </div>
    </div>
  );
};
