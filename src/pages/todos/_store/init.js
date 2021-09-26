import { Slice } from '@@/libs/store/slice2';

const todosSlice = new Slice('todos');

export const fetchTodos = todosSlice.create('fetchMessages', {
  async: true,
});

export const rndCounter = todosSlice.create('rndCounter');
export const incrementCounter = todosSlice.create('incrementCounter');
export const decrementCounter = todosSlice.create('decrementCounter');

export const asyncCounter = todosSlice.create('asyncCounter', {
  async: true,
});

export const {
  name: TODOS_SLICE_NAME,
  actions: todosActions,
  types: todosTypes,
} = todosSlice;

export { reducer as todosReducer } from './reducer';
