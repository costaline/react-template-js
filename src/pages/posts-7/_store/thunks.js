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

export const likePost = (postId) => async (dispatch) => {
  dispatch(A.likePostStart({ key: postId }));

  try {
    await new Promise((resolve) => setTimeout(resolve, 10000));

    const post = mock.find((item) => item.id === postId);

    dispatch(A.likePostSuccess({ ...post, liked: true }, { key: postId }));
  } catch (error) {
    dispatch(A.likePostFailure(error.message, { key: postId }));
  }
};
