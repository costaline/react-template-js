import { asyncCounter, fetchMessages } from './init';
import messages from './messages';

export const fetchMessagesAction = () => async (dispatch) => {
  dispatch(fetchMessages.request.ac());

  try {
    const data = await new Promise((resolve) => {
      setTimeout(resolve, 5000, messages);
    });

    dispatch(fetchMessages.success.ac(data));
  } catch (error) {
    dispatch(fetchMessages.failure.ac(error.message));
  }
};

export const asyncCounterAction = () => async (dispatch) => {
  dispatch(asyncCounter.request.ac());

  await new Promise((resolve) => setTimeout(resolve, 10 * 1000));

  dispatch(asyncCounter.success.ac(10));
};
