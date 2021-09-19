import {
  asyncCounter,
  decrementCounter,
  fetchPosts,
  incrementCounter,
  rndCounter,
} from './init';
import posts from './posts';

const fetchPostActionPending = () => {
  return { type: fetchPosts.type.pending };
};

const fetchPostActionFulfilled = (payload) => {
  return { type: fetchPosts.type.fulfilled, payload };
};

const fetchPostActionRejected = (error) => {
  return { type: fetchPosts.type.rejected, error };
};

export const fetchPostsAction = () => async (dispatch) => {
  dispatch(fetchPostActionPending());

  try {
    const data = await new Promise((resolve) =>
      setTimeout(resolve, 5000, posts)
    );

    dispatch(fetchPostActionFulfilled(data));
  } catch (error) {
    dispatch(fetchPostActionRejected(error.message));
  }
};

export const setCounterAction = (value) => ({
  type: rndCounter.type,
  payload: value,
});

export const incrementCounterAction = () => ({
  type: incrementCounter.type,
});

export const decrementCounterAction = () => ({
  type: decrementCounter.type,
});

export const asyncCounterAction = () => async (dispatch) => {
  dispatch({
    type: asyncCounter.type.pending,
  });

  await new Promise((resolve) => setTimeout(resolve, 10 * 1000));

  dispatch({
    type: asyncCounter.type.fulfilled,
    payload: 10,
  });
};
