import {
  asyncCounter,
  decrementCounter,
  fetchMessages,
  incrementCounter,
  rndCounter,
} from './init';

const initialState = {
  messages: null,
  counter: 0,
  asyncTasks: [],
  errors: {},
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchMessages.request.type:
      return {
        ...state,
        messages: null,
        asyncTasks: fetchMessages.asyncTask.add(state.asyncTasks),
        errors: fetchMessages.error.remove(state.errors),
      };

    case fetchMessages.success.type:
      return {
        ...state,
        messages: action.payload,
        asyncTasks: fetchMessages.asyncTask.remove(state.asyncTasks),
      };

    case fetchMessages.failure.type:
      return {
        ...state,
        errors: fetchMessages.error.add(state.errors, action.error),
        asyncTasks: fetchMessages.asyncTask.remove(state.asyncTasks),
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

    case asyncCounter.request.type:
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
