import { produce } from 'immer';

import C from './constants';
import {
  updateErrors,
  updateErrorsWithMeta,
  updateExpectations,
  updateExpectationsWithMeta,
} from './helpers';

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
      draft._errors = updateErrors(draft._errors, action);
      draft._expectations = updateExpectations(draft._expectations, action);
      break;

    case C.ASYNC_SET_COUNTER_SUCCESS:
      draft.counter += action.payload;
      draft._expectations = updateExpectations(draft._expectations, action);
      break;

    case C.ASYNC_SET_COUNTER_FAILURE:
      draft._errors = updateErrors(draft._errors, action);
      draft._expectations = updateExpectations(draft._expectations, action);
      break;

    case C.FETCH_POSTS_START:
      draft._errors = updateErrors(draft._errors, action);
      draft._expectations = updateExpectations(draft._expectations, action);
      break;

    case C.FETCH_POSTS_SUCCESS:
      draft.posts = action.payload;
      draft._expectations = updateExpectations(draft._expectations, action);
      break;

    case C.FETCH_POSTS_FAILURE:
      draft._errors = updateErrors(draft._errors, action);
      draft._expectations = updateExpectations(draft._expectations, action);
      break;

    case C.LIKE_POST_START:
      draft._errors = updateErrorsWithMeta(draft._errors, action, action.meta);

      draft._expectations = updateExpectationsWithMeta(
        draft._expectations,
        action,
        action.meta
      );
      break;

    case C.LIKE_POST_SUCCESS:
      {
        const postId = action.payload.id;

        const postIdx = draft.posts.findIndex((item) => item.id === postId);

        if (postIdx !== -1) draft.posts[postIdx].liked = true;

        draft._expectations = updateExpectationsWithMeta(
          draft._expectations,
          action,
          action.meta
        );
      }
      break;

    case C.LIKE_POST_FAILURE:
      draft._errors = updateErrorsWithMeta(draft._errors, action, action.meta);

      draft._expectations = updateExpectationsWithMeta(
        draft._expectations,
        action,
        action.meta
      );
      break;

    default:
      break;
  }
}, initialState);
