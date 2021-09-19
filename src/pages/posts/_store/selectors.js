import { fetchPosts, SLICE_NAME } from './init';

export const selectPostsData = (state) => state.posts[SLICE_NAME];
export const selectPostsError = (state) =>
  fetchPosts.selector.error(state[SLICE_NAME]);
export const selectPostsIsFetching = (state) =>
  fetchPosts.selector.isPending(state[SLICE_NAME]);

export const selectPostsSlice = (state) => ({
  data: selectPostsData(state),
  error: selectPostsError(state),
  isPending: selectPostsIsFetching(state),
});

export const selectCounter = (state) => state[SLICE_NAME].counter;
