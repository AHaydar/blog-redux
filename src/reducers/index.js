import { combineReducers } from 'redux';

import postsReducer from './postsReducer';
import singlePostReducer from './singlePostReducer';
import commentsReducer from './commentsReducer';

const rootReducer = combineReducers({
  posts: postsReducer,
  singlePost: singlePostReducer,
  comments: commentsReducer,
});

export default rootReducer;
