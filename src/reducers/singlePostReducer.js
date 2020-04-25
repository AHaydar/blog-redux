import * as actions from '../actions/singlePostActions';

export const initialState = {
  loading: true,
  hasErrors: false,
  post: {},
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_SINGLE_POST:
      return { ...state, loading: true };
    case actions.GET_SINGLE_POST_SUCCESS:
      return { post: action.payload, loading: false, hasErrors: false };
    case actions.GET_SINGLE_POST_FAILURE:
      return { ...state, loading: false, hasErrors: true };
    default:
      return state;
  }
}
