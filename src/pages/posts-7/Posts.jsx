import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';

import {
  asyncSetCounter,
  decrementCounter,
  fetchPosts,
  incrementCounter,
  likePost,
  selectCounter,
  selectPostLikes,
  selectPosts,
} from './_store';

export const Posts = () => {
  const counter = useSelector(selectCounter);
  const posts = useSelector(selectPosts);
  const postLikes = useSelector(selectPostLikes);

  const dispatch = useDispatch();

  return (
    <div>
      <div
        css={css`
          display: grid;
          grid-auto-flow: column;
          column-gap: 20px;
          justify-content: start;
          align-items: center;
        `}
      >
        <h2>Posts</h2> {posts.isPending && <small>(Loading...)</small>}
      </div>

      {posts.error && <small>Error: {posts.error}</small>}
      {posts.data ? (
        <ul>
          {posts.data.map(({ id, name, text, liked }) => (
            <li key={id}>
              <span>
                {name}(like:{String(liked)}): {text}
              </span>
              {!liked && (
                <button
                  disabled={
                    !!postLikes.pendingList.find(([_, { key }]) => key === id)
                  }
                  onClick={() => dispatch(likePost(id))}
                >
                  like
                </button>
              )}
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
      {counter.error && <small>Error: {counter.error}</small>}
      <div>
        <button onClick={() => dispatch(decrementCounter())}>dec</button>
        <button
          disabled={counter.isPending}
          onClick={() => dispatch(asyncSetCounter())}
        >
          {counter.isPending ? 'updating' : 'async'}
        </button>
        <button onClick={() => dispatch(incrementCounter())}>inc</button>
      </div>
    </div>
  );
};
