import { produce } from 'immer';

import C from './constants';
import { updateErrors, updateExpectations } from './helpers';

const initialState = {
  counter: 0,
  posts: null,
  _expectations: [],
  _errors: {},
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
    case C.INCREMENT_COUNTER:
      draft.counter += 1;
      break;

    case C.DECREMENT_COUNTER:
      draft.counter -= 1;
      break;

    case C.ASYNC_SET_COUNTER_START:
      draft._expectations = updateExpectations(draft._expectations, action);
      draft._errors = updateErrors(draft._errors, action);
      break;

    case C.ASYNC_SET_COUNTER_SUCCESS:
      draft._expectations = updateExpectations(draft._expectations, action);
      draft.counter += action.payload;
      break;

    case C.ASYNC_SET_COUNTER_FAILURE:
      draft._expectations = updateExpectations(draft._expectations, action);
      draft._errors = updateErrors(draft._errors, action);
      break;

    case C.FETCH_POSTS_START:
      draft._expectations = updateExpectations(draft._expectations, action);
      draft._errors = updateErrors(draft._errors, action);
      break;

    case C.FETCH_POSTS_SUCCESS:
      draft._expectations = updateExpectations(draft._expectations, action);
      draft.posts = action.payload;
      break;

    case C.FETCH_POSTS_FAILURE:
      draft._expectations = updateExpectations(draft._expectations, action);
      draft._errors = updateErrors(draft._errors, action);
      break;

    default:
      break;
  }
}, initialState);
