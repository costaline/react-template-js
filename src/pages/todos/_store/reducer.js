import {
  asyncCounter,
  decrementCounter,
  fetchTodos,
  incrementCounter,
  rndCounter,
} from './init';

const initialState = {
  todos: null,
  counter: 0,
  asyncTasks: [],
  errors: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchTodos.start.type:
      return {
        ...state,
        todos: null,
        asyncTasks: fetchTodos.asyncTask.add(state.asyncTasks),
        errors: fetchTodos.error.remove(state.errors),
      };

    case fetchTodos.success.type:
      return {
        ...state,
        todos: action.payload,
        asyncTasks: fetchTodos.asyncTask.remove(state.asyncTasks),
      };

    case fetchTodos.failure.type:
      return {
        ...state,
        errors: fetchTodos.error.add(state.errors, action.error),
        asyncTasks: fetchTodos.asyncTask.remove(state.asyncTasks),
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

    case asyncCounter.start.type:
      return {
        ...state,
        asyncTasks: asyncCounter.asyncTask.add(state.asyncTasks),
      };

    case asyncCounter.success.type:
      return {
        ...state,
        counter: state.counter + 10,
        asyncTasks: asyncCounter.asyncTask.remove(state.asyncTasks),
      };

    default:
      return state;
  }
};
