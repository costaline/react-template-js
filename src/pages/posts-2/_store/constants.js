import { typeCreator } from './helpers';

const posts = typeCreator('posts');

export default {
  INCREMENT_COUNTER: posts('incrementCounter'),
  DECREMENT_COUNTER: posts('decrementCounter'),
  ASYNC_SET_COUNTER_START: posts('asyncSetCounter', 'start'),
  ASYNC_SET_COUNTER_SUCCESS: posts('asyncSetCounter', 'success'),
  ASYNC_SET_COUNTER_FAILURE: posts('asyncSetCounter', 'failure'),
  FETCH_POSTS_START: posts('fetchPosts', 'start'),
  FETCH_POSTS_SUCCESS: posts('fetchPosts', 'success'),
  FETCH_POSTS_FAILURE: posts('fetchPosts', 'failure'),
};
