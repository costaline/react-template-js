import { combineReducers } from 'redux';

import { posts1Reducer } from '@@/pages/posts-1/_store';
import { posts2Reducer } from '@@/pages/posts-2/_store';
import { posts3Reducer } from '@@/pages/posts-3/_store';

const combined = combineReducers({
  posts1: posts1Reducer,
  posts2: posts2Reducer,
  posts3: posts3Reducer,
});

/* https://stackoverflow.com/a/35641992 */
export const rootReducer = (state, action) => {
  const isResetState = action.type === 'RESET_STATE';

  return combined(isResetState ? undefined : state, action);
};
