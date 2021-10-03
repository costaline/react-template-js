import { typeCreator } from './helpers';

export const SLICE_NAME = 'posts-7';

const type = typeCreator(SLICE_NAME);

export default {
  INCREMENT_COUNTER: type('incrementCounter'),
  DECREMENT_COUNTER: type('decrementCounter'),
  ASYNC_SET_COUNTER_START: type('asyncSetCounter', 'start'),
  ASYNC_SET_COUNTER_SUCCESS: type('asyncSetCounter', 'success'),
  ASYNC_SET_COUNTER_FAILURE: type('asyncSetCounter', 'failure'),
  FETCH_POSTS_START: type('fetchPosts', 'start'),
  FETCH_POSTS_SUCCESS: type('fetchPosts', 'success'),
  FETCH_POSTS_FAILURE: type('fetchPosts', 'failure'),
  LIKE_POST_START: type('likePost', 'start'),
  LIKE_POST_SUCCESS: type('likePost', 'success'),
  LIKE_POST_FAILURE: type('likePost', 'failure'),
};
