import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Post } from '../components/Post';
import { fetchPosts } from '../actions/postsActions';

const PostsPage = ({ dispatch, loading, posts, hasErrors }) => {
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const renderPosts = () => {
    if (loading) return <p> loading posts...</p>;
    if (hasErrors) return <p> Unable to display posts...</p>;

    return posts.map((post) => <Post key={post.id} post={post} excerpt />);
  };

  return (
    <section>
      <h1>Posts</h1>
      {renderPosts()}
    </section>
  );
};

const mapStateToProp = (state) => ({
  loading: state.posts.loading,
  posts: state.posts.posts,
  hasErrors: state.posts.hasErrors,
});

export default connect(mapStateToProp)(PostsPage);
