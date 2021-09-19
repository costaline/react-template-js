import { combineReducers } from 'redux';

import { POSTS_SLICE_NAME, postsReducer } from '@@/pages/posts/_store';

const appReducer = combineReducers({
  [POSTS_SLICE_NAME]: postsReducer,
});

/* https://stackoverflow.com/a/35641992 */
export const rootReducer = (state, action) => {
  const isResetState = action.type === 'RESET_STATE';

  return appReducer(isResetState ? undefined : state, action);
};
