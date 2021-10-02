import {
  getError,
  getExpectationStatus,
} from '@@/pages/posts-2/_store/helpers';
import C from './constants';

export const selectCounter = (state) => ({
  data: state.posts2.counter,
  isPending: getExpectationStatus(
    state.posts2._expectations,
    C.ASYNC_SET_COUNTER_START
  ),
  error: getError(state.posts2._errors, C.ASYNC_SET_COUNTER_FAILURE),
});

export const selectPosts = (state) => ({
  data: state.posts2.posts,
  isPending: getExpectationStatus(
    state.posts2._expectations,
    C.FETCH_POSTS_START
  ),
  error: getError(state.posts2._errors, C.FETCH_POSTS_FAILURE),
});
