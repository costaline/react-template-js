import C, { SLICE_NAME } from './constants';
import { getError, getExpectationStatus } from './helpers';

export const selectCounter = (state) => ({
  data: state[SLICE_NAME].counter,
  isPending: getExpectationStatus(
    state[SLICE_NAME]._expectations,
    C.ASYNC_SET_COUNTER_START
  ),
  error: getError(state[SLICE_NAME]._errors, C.ASYNC_SET_COUNTER_FAILURE),
});

export const selectPosts = (state) => ({
  data: state[SLICE_NAME].posts,
  isPending: getExpectationStatus(
    state[SLICE_NAME]._expectations,
    C.FETCH_POSTS_START
  ),
  error: getError(state[SLICE_NAME]._errors, C.FETCH_POSTS_FAILURE),
});
