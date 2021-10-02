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

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case C.INCREMENT_COUNTER:
      return {
        ...state,
        counter: {
          ...state.counter,
          data: state.counter.data + 1,
        },
      };

    case C.DECREMENT_COUNTER:
      return {
        ...state,
        counter: {
          ...state.counter,
          data: state.counter.data - 1,
        },
      };

    case C.ASYNC_SET_COUNTER_START:
      return {
        ...state,
        counter: {
          ...state.counter,
          isPending: true,
        },
      };

    case C.ASYNC_SET_COUNTER_SUCCESS:
      return {
        ...state,
        counter: {
          ...state.counter,
          isPending: false,
          data: state.counter.data + action.payload,
        },
      };

    case C.ASYNC_SET_COUNTER_FAILURE:
      return {
        ...state,
        counter: {
          ...state.counter,
          isPending: false,
          error: action.error,
        },
      };

    case C.FETCH_POSTS_START:
      return {
        ...state,
        posts: {
          data: null,
          isPending: true,
          error: null,
        },
      };

    case C.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          ...state.posts,
          isPending: false,
          data: action.payload,
        },
      };

    case C.FETCH_POSTS_FAILURE:
      return {
        ...state,
        posts: {
          ...state.posts,
          isPending: false,
          error: action.error,
        },
      };

    default:
      return state;
  }
};
