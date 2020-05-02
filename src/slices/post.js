import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  post: {},
  loading: false,
  hasErrors: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPost: (state) => {
      state.loading = true;
    },
    getPostSuccess: (state, { payload }) => {
      state.post = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getPostFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getPost, getPostSuccess, getPostFailure } = postSlice.actions;

export const postSelector = (state) => state.post;

export function fetchPost(id) {
  return async (dispatch) => {
    dispatch(getPost());

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await response.json();

      dispatch(getPostSuccess(data));
    } catch (error) {
      dispatch(getPostFailure());
    }
  };
}

export default postSlice.reducer;
