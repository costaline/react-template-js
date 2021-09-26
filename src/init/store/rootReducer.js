import { combineReducers } from 'redux';

import { MESSAGES_SLICE_NAME } from '@@/pages/messages/_store/init';
import { messagesReducer } from '@@/pages/messages/_store/reducer';
import { POSTS_SLICE_NAME, postsReducer } from '@@/pages/posts/_store';
import { TODOS_SLICE_NAME, todosReducer } from '@@/pages/todos/_store/init';

const appReducer = combineReducers({
  [POSTS_SLICE_NAME]: postsReducer,
  [MESSAGES_SLICE_NAME]: messagesReducer,
  [TODOS_SLICE_NAME]: todosReducer,
});

/* https://stackoverflow.com/a/35641992 */
export const rootReducer = (state, action) => {
  const isResetState = action.type === 'RESET_STATE';

  return appReducer(isResetState ? undefined : state, action);
};
