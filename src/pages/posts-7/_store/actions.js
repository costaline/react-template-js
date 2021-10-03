import C from './constants';

export const incrementCounter = () => ({
  type: C.INCREMENT_COUNTER,
});

export const decrementCounter = () => ({
  type: C.DECREMENT_COUNTER,
});

export const asyncSetCounterStart = () => ({
  type: C.ASYNC_SET_COUNTER_START,
});

export const asyncSetCounterSuccess = (payload) => ({
  type: C.ASYNC_SET_COUNTER_SUCCESS,
  payload,
});

export const asyncSetCounterFailure = (error) => ({
  type: C.ASYNC_SET_COUNTER_SUCCESS,
  error,
});

export const fetchPostsStart = (payload) => ({
  type: C.FETCH_POSTS_START,
  payload,
});

export const fetchPostsSuccess = (payload) => ({
  type: C.FETCH_POSTS_SUCCESS,
  payload,
});

export const fetchPostsFailure = (error) => ({
  type: C.FETCH_POSTS_FAILURE,
  error,
});

export const likePostStart = (meta) => ({
  type: C.LIKE_POST_START,
  meta,
});

export const likePostSuccess = (payload, meta) => ({
  type: C.LIKE_POST_SUCCESS,
  payload,
  meta,
});

export const likePostFailure = (error, meta) => ({
  type: C.LIKE_POST_FAILURE,
  error,
  meta,
});
