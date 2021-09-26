import { fetchTodos, TODOS_SLICE_NAME } from './init';

export const getCounter = (state) => state.counter;

export const getTodosSlice = (state) => ({
  todos: state[TODOS_SLICE_NAME].todos,
  isPending: fetchTodos.asyncTask.isPending(state[TODOS_SLICE_NAME].asyncTasks),
  error: fetchTodos.error.get(state[TODOS_SLICE_NAME].errors),
});
