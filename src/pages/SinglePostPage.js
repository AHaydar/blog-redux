import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchSinglePost from '../actions/singlePostActions';
import { fetchComments } from '../actions/commentsActions';

import { Post } from '../components/Post';
import { Comment } from '../components/Comment';

const SinglePostPage = ({
  match,
  dispatch,
  post,
  comments,
  hasErrors,
  loading,
}) => {
  useEffect(() => {
    const { id } = match.params;

    dispatch(fetchComments(id));
    dispatch(fetchSinglePost(id));
  }, [dispatch, match]);

  const renderPost = () => {
    if (loading.post) return <p>Loading post...</p>;
    if (hasErrors.post) return <p>Unable to display post.</p>;

    return <Post post={post} />;
  };

  const renderComments = () => {
    if (loading.comments) return <p>Loading comments...</p>;
    if (hasErrors.comments) return <p>Unable to display comments.</p>;

    return comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ));
  };

  return (
    <section>
      {renderPost()}
      <h2>Comments</h2>
      {renderComments()}
    </section>
  );
};

const mapStateToProps = (state) => ({
  post: state.singlePost.post,
  comments: state.comments.comments,
  loading: { post: state.singlePost.loading, comments: state.comments.loading },
  hasErrors: {
    post: state.singlePost.hasErrors,
    comments: state.comments.hasErrors,
  },
});

export default connect(mapStateToProps)(SinglePostPage);
