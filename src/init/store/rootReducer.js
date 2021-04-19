import { combineReducers } from 'redux';

const appReducer = combineReducers({});

/* https://stackoverflow.com/a/35641992 */
export const rootReducer = (state, action) => {
  const isResetState = action.type === 'RESET_STATE';

  return appReducer(isResetState ? undefined : state, action);
};
