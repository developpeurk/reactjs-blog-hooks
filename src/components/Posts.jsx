import React from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { render } from '@testing-library/react';

export default function Posts() {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    const unsubscribe = getPosts();
    return () => {
      unsubscribe();
    };
  }, []);

  const voteUp = (postId) => {
    const post = firebase.collection('posts').doc(postId);
    post.get().then((doc) => {
      if (doc.exists) {
        const previousVoteCount = doc.data().vote_count;
        post.update({ vote_count: previousVoteCount + 1 });
      }
    });
  };

  const voteDown = (postId) => {
    const post = firebase.collection('posts').doc(postId);
    post.get().then((doc) => {
      if (doc.exists) {
        const previousVoteCount = doc.data().vote_count;
        if (previousVoteCount > 0)
          post.update({ vote_count: previousVoteCount - 1 });
        else alert('impossible de votez (-) !');
      }
    });
  };
  const getPosts = () => {
    return firebase
      .collection('posts')
      .orderBy('created_at', 'desc')
      .onSnapshot((snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setPosts(posts);
      });
  };
  const renderPosts = () => {
    return (
      posts &&
      posts.map((post, index) => (
        <div key={index} className="post">
          <div className="post-image">
            <img src={post.image} alt="" />
          </div>
          <div className="post-content">
            <Link to={`/post/${post.id}`}>
              <h3 className="post-title">{post.title}</h3>
            </Link>

            <h5 className="post-details">
              <span className="posted-by">{post.postedBy.name}</span>
              <span className="date">{moment(post.created_at).fromNow()}</span>
            </h5>
            <p className="post-body">{post.body}</p>
            <div className="votes">
              <div className="up" onClick={() => voteUp(post.id)}>
                &#8593;
              </div>
              <div className="down" onClick={() => voteDown(post.id)}>
                &#8595;
              </div>
              <div className="count">{post.vote_count}</div>
            </div>
          </div>
        </div>
      ))
    );
  };

  const renderTop = () => {
    const topPosts = posts.sort(
      (postOne, postTwo) => postTwo.vote_count - postOne.vote_count
    );
    return topPosts.map((post, index) => {
      return (
        <Link key={index} to={`/post/${post.id}`}>
          <h3 className="post-title trend-link">
            {' '}
            {index + 1}
            {' - '}
            {post.title}
          </h3>
        </Link>
      );
    });
  };

  return (
    <div className="main-content">
      <div className="posts">{renderPosts()}</div>
      <div className="sidebar">
        <h3 className="sidebar-title">Trends</h3>
        <div className="sidebar-content">{renderTop()}</div>
      </div>
    </div>
  );
}
