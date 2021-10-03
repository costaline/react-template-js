import { combineReducers } from 'redux';

import { posts1Reducer } from '@@/pages/posts-1/_store';
import { posts2Reducer } from '@@/pages/posts-2/_store';
import { posts3Reducer } from '@@/pages/posts-3/_store';
import { posts4Reducer } from '@@/pages/posts-4/_store';
import { posts5Reducer } from '@@/pages/posts-5/_store';
import { POSTS_6_SLICE_NAME, posts6Reducer } from '@@/pages/posts-6/_store';
import { POSTS_7_SLICE_NAME, posts7Reducer } from '@@/pages/posts-7/_store';

const combined = combineReducers({
  posts1: posts1Reducer,
  posts2: posts2Reducer,
  posts3: posts3Reducer,
  posts4: posts4Reducer,
  posts5: posts5Reducer,
  [POSTS_6_SLICE_NAME]: posts6Reducer,
  [POSTS_7_SLICE_NAME]: posts7Reducer,
});

/* https://stackoverflow.com/a/35641992 */
export const rootReducer = (state, action) => {
  const isResetState = action.type === 'RESET_STATE';

  return combined(isResetState ? undefined : state, action);
};
