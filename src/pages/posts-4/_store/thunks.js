import * as A from './actions';
import mock from './mock.json';

export const asyncSetCounter = () => async (dispatch) => {
  dispatch(A.asyncSetCounterStart());

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    dispatch(A.asyncSetCounterSuccess(10));
  } catch (error) {
    dispatch(A.asyncSetCounterFailure(error.message));
  }
};

export const fetchPosts = () => async (dispatch) => {
  dispatch(A.fetchPostsStart());

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    dispatch(A.fetchPostsSuccess(mock));
  } catch (error) {
    dispatch(A.fetchPostsFailure(error.message));
  }
};
