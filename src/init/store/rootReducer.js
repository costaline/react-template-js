import { combineReducers } from 'redux';

import { posts1Reducer } from '@@/pages/posts-1/_store';

const combined = combineReducers({
  posts1: posts1Reducer,
});

/* https://stackoverflow.com/a/35641992 */
export const rootReducer = (state, action) => {
  const isResetState = action.type === 'RESET_STATE';

  return combined(isResetState ? undefined : state, action);
};
