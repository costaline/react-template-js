import { produce } from 'immer';

import C from './constants';

const initialState = {
  counter: {
    data: 0,
    isPending: false,
    error: null,
  },
  posts: {
    data: null,
    isPending: false,
    error: null,
  },
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
    case C.INCREMENT_COUNTER:
      draft.counter.data += 1;
      break;

    case C.DECREMENT_COUNTER:
      draft.counter.data -= 1;
      break;

    case C.ASYNC_SET_COUNTER_START:
      draft.counter.isPending = true;
      break;

    case C.ASYNC_SET_COUNTER_SUCCESS:
      draft.counter.data += action.payload;
      draft.counter.isPending = false;
      break;

    case C.ASYNC_SET_COUNTER_FAILURE:
      draft.counter.error = action.error;
      draft.counter.isPending = false;
      break;

    case C.FETCH_POSTS_START:
      draft.posts.isPending = true;
      draft.posts.error = null;
      draft.posts.data = null;
      break;

    case C.FETCH_POSTS_SUCCESS:
      draft.posts.data = action.payload;
      draft.posts.isPending = false;
      break;

    case C.FETCH_POSTS_FAILURE:
      draft.posts.error = action.error;
      draft.posts.isPending = false;
      break;

    default:
      break;
  }
}, initialState);
