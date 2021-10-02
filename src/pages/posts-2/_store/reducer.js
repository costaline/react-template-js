import C from './constants';
import { updateErrors, updateExpectations } from './helpers';

const initialState = {
  counter: 0,
  posts: null,
  _expectations: [],
  _errors: {},
};

const HANDLERS = {
  [C.INCREMENT_COUNTER]: (state) => ({
    ...state,
    counter: state.counter + 1,
  }),

  [C.DECREMENT_COUNTER]: (state) => ({
    ...state,
    counter: state.counter - 1,
  }),

  [C.ASYNC_SET_COUNTER_START]: (state, action) => ({
    ...state,
    _expectations: updateExpectations(state._expectations, action),
    _errors: updateErrors(state._errors, action),
  }),

  [C.ASYNC_SET_COUNTER_SUCCESS]: (state, action) => ({
    ...state,
    _expectations: updateExpectations(state._expectations, action),
    counter: state.counter + action.payload,
  }),

  [C.ASYNC_SET_COUNTER_FAILURE]: (state, action) => ({
    ...state,
    _expectations: updateExpectations(state._expectations, action),
    _errors: updateErrors(state._errors, action),
  }),

  [C.FETCH_POSTS_START]: (state, action) => ({
    ...state,
    _expectations: updateExpectations(state._expectations, action),
    _errors: updateErrors(state._errors, action),
  }),

  [C.FETCH_POSTS_SUCCESS]: (state, action) => ({
    ...state,
    _expectations: updateExpectations(state._expectations, action),
    posts: action.payload,
  }),

  [C.FETCH_POSTS_FAILURE]: (state, action) => ({
    ...state,
    _expectations: updateExpectations(state._expectations, action),
    _errors: updateErrors(state._errors, action),
  }),

  DEFAULT: (state) => state,
};

export const reducer = (state = initialState, action) => {
  const handler = HANDLERS[action.type] || HANDLERS.DEFAULT;

  return handler(state, action);
};
