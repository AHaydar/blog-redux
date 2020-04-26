import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  comments: [],
  loading: false,
  hasErrors: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    getComments: (state) => {
      state.loading = true;
    },
    getCommentsSuccess: (state, { payload }) => {
      state.comments = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getCommentsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  getComments,
  getCommentsSuccess,
  getCommentsFailure,
} = commentsSlice.actions;

export const commentsSelector = (state) => state.comments;

export function fetchComments(id) {
  return async (dispatch) => {
    dispatch(getComments());

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${id}`
      );
      const data = await response.json();

      dispatch(getCommentsSuccess(data));
    } catch (error) {
      dispatch(getCommentsFailure());
    }
  };
}

export default commentsSlice.reducer;
