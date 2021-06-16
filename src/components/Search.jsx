import React from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

import moment from 'moment';

export default function Search() {
  const [posts, setPosts] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const searchQuery = search.toLowerCase();
    firebase.collection('posts').onSnapshot((snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const foundPosts =
        posts &&
        posts.filter((post) => {
          return (
            post.title.toLowerCase().includes(searchQuery) ||
            post.body.toLowerCase().includes(searchQuery) ||
            post.postedBy.name.toLowerCase().includes(searchQuery)
          );
        });
      setPosts(foundPosts);
      //   console.log(foundPosts);
      setSearch('');
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
          </div>
        </div>
      ))
    );
  };

  return (
    <div>
      <div className="form-container">
        <h2 className="register-form-title">Search</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="search"
            className="form-control"
            name=""
            placeholder="Search..."
            onChange={(event) => setSearch(event.target.value)}
            value={search}
          />
          <button className="btn btn-primary" type="submit">
            valider
          </button>
        </form>
      </div>
      <div className="main-content">
        <div className="posts">{renderPosts()}</div>
      </div>
    </div>
  );
}
