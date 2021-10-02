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

export const fetchPostsStart = () => ({
  type: C.FETCH_POSTS_START,
});

export const fetchPostsSuccess = (payload) => ({
  type: C.FETCH_POSTS_SUCCESS,
  payload,
});

export const fetchPostsFailure = (error) => ({
  type: C.FETCH_POSTS_FAILURE,
  error,
});
