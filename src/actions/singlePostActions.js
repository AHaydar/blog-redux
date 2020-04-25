export const GET_SINGLE_POST = 'GET_SINGLE_POST';
export const GET_SINGLE_POST_SUCCESS = 'GET_SINGLE_POST_SUCCESS';
export const GET_SINGLE_POST_FAILURE = 'GET_SINGLE_POST_FAILURE';

const getSinglePost = () => ({ type: GET_SINGLE_POST });

const getSinglePostSuccess = (post) => ({
  type: GET_SINGLE_POST_SUCCESS,
  payload: post,
});

const getSinglePostFailure = () => ({ type: GET_SINGLE_POST_FAILURE });

export default function fetchSinglePost(id) {
  return async (dispatch) => {
    dispatch(getSinglePost);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await response.json();

      dispatch(getSinglePostSuccess(data));
    } catch (e) {
      dispatch(getSinglePostFailure());
    }
  };
}
