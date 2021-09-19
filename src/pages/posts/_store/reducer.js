import {
  asyncCounter,
  decrementCounter,
  fetchPosts,
  incrementCounter,
  rndCounter,
} from './init';

const initialState = {
  counter: 0,
  posts: null,
  asyncTasks: [],
  errors: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchPosts.type.pending:
      return {
        ...state,
        posts: null,
        asyncTasks: fetchPosts.asyncTask.add(state.asyncTasks),
        errors: fetchPosts.error.remove(state.errors),
      };

    case fetchPosts.type.fulfilled:
      return {
        ...state,
        posts: action.payload,
        asyncTasks: fetchPosts.asyncTask.remove(state.asyncTasks),
      };

    case fetchPosts.type.rejected:
      return {
        ...state,
        errors: fetchPosts.error.add(state.errors, action.error),
        asyncTasks: fetchPosts.asyncTask.remove(state.asyncTasks),
      };

    case rndCounter.type:
      return {
        ...state,
        counter: state.counter + action.payload,
      };

    case incrementCounter.type:
      return {
        ...state,
        counter: state.counter + 1,
      };

    case decrementCounter.type:
      return {
        ...state,
        counter: state.counter - 1,
      };

    case asyncCounter.type.pending:
      return {
        ...state,
        asyncTasks: asyncCounter.asyncTask.add(state.asyncTasks),
      };

    case asyncCounter.type.fulfilled:
      return {
        ...state,
        counter: action.payload,
        asyncTasks: asyncCounter.asyncTask.remove(state.asyncTasks),
      };

    default:
      return state;
  }
};
