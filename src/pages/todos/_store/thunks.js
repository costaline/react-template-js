import { asyncCounter, fetchTodos } from './init';
import messages from './todos';

export const fetchTodosAction = () => async (dispatch) => {
  dispatch(fetchTodos.start.ac());

  try {
    const data = await new Promise((resolve) => {
      setTimeout(resolve, 5000, messages);
    });

    dispatch(fetchTodos.success.ac(data));
  } catch (error) {
    dispatch(fetchTodos.failure.ac(error.message));
  }
};

export const asyncCounterAction = () => async (dispatch) => {
  dispatch(asyncCounter.start.ac());

  await new Promise((resolve) => setTimeout(resolve, 10 * 1000));

  dispatch(asyncCounter.success.ac(10));
};
