import React from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = getPosts();
    return () => {
      unsubscribe();
    };
  }, []);

  const getPosts = () => {
    return firebase
      .collection('posts')
      .limit(10)
      .onSnapshot((snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        const topPosts = posts.sort(
          (postOne, postTwo) => postTwo.vote_count - postOne.vote_count
        );
        setPosts(topPosts);
      });
  };
  const renderPosts = () => {
    return (
      posts &&
      posts.map((post, index) => (
        <Link key={index} to={`/post/${post.id}`}>
          <h3 className="post-title trend-link">
            {' '}
            {index + 1}
            {' - '}
            {post.title}
          </h3>
        </Link>
      ))
    );
  };

  return renderPosts();
}
