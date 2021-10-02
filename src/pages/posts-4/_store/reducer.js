import { produce } from 'immer';

import C from './constants';
import { updateErrors, updateExpectations } from './helpers';

const initialState = {
  counter: 0,
  posts: null,
  _expectations: [],
  _errors: {},
};

const HANDLERS = {
  [C.INCREMENT_COUNTER]: (draft) => {
    draft.counter += 1;
  },

  [C.DECREMENT_COUNTER]: (draft) => {
    draft.counter -= 1;
  },

  [C.ASYNC_SET_COUNTER_START]: (draft, action) => {
    draft._expectations = updateExpectations(draft._expectations, action);
    draft._errors = updateErrors(draft._errors, action);
  },

  [C.ASYNC_SET_COUNTER_SUCCESS]: (draft, action) => {
    draft._expectations = updateExpectations(draft._expectations, action);
    draft.counter += action.payload;
  },

  [C.ASYNC_SET_COUNTER_FAILURE]: (draft, action) => {
    draft._expectations = updateExpectations(draft._expectations, action);
    draft._errors = updateErrors(draft._errors, action);
  },

  [C.FETCH_POSTS_START]: (draft, action) => {
    draft._expectations = updateExpectations(draft._expectations, action);
    draft._errors = updateErrors(draft._errors, action);
  },

  [C.FETCH_POSTS_SUCCESS]: (draft, action) => {
    draft._expectations = updateExpectations(draft._expectations, action);
    draft.posts = action.payload;
  },

  [C.FETCH_POSTS_FAILURE]: (draft, action) => {
    draft._expectations = updateExpectations(draft._expectations, action);
    draft._errors = updateErrors(draft._errors, action);
  },

  DEFAULT: (draft) => draft,
};

export const reducer = produce((draft, action) => {
  const handler = HANDLERS[action.type] || HANDLERS.DEFAULT;

  handler(draft, action);
}, initialState);
