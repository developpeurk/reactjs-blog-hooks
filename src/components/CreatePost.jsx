import React from 'react';
import firebase from '../firebase';
import AuthContext from './AuthContext/index.js';
import { firebaseStorage } from '../firebase';

export default function CreatePost({ history }) {
  const [post, setPost] = React.useState({
    title: '',
    body: '',
    image: '',
  });
  const [image, setImage] = React.useState(null);

  const { authUser } = React.useContext(AuthContext);
  React.useEffect(() => {
    if (!authUser) {
      history.push('/login');
    }
  }, [authUser]);

  const handleFileInput = (event) => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      setImage(image);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleImageUpload();
  };

  const handleImageUpload = () => {
    const uploadImage = firebaseStorage.ref(`images/${image.name}`).put(image);
    uploadImage.on(
      'state_changed',
      (snapshot) => {
        console.log('uploading...');
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        firebaseStorage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            const { title, body } = post;
            const newPost = {
              title,
              body,
              image: url,
              postedBy: {
                id: authUser.uid,
                name: authUser.displayName,
              },
              vote_count: 0,
              comments: [],
              created_at: Date.now(),
            };
            firebase.collection('posts').add(newPost);
            history.push('/');
          });
      }
    );
  };

  const handleInputChange = (event) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="form-container">
      <h2 className="register-form-title">Create a post</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="title"
          required
          className="form-control"
          placeholder="title"
          autoComplete="off"
          value={post.title}
          onChange={handleInputChange}
        />
        <textarea
          className="form-control"
          name="body"
          value={post.body}
          placeholder="body"
          onChange={handleInputChange}
          cols="30"
          rows="10"
        ></textarea>
        <input
          onChange={handleFileInput}
          type="file"
          required
          className="form-control"
          name="image"
        />
        <div>
          <button className="btn btn-primary" type="submit">
            Valid
          </button>
        </div>
      </form>
    </div>
  );
}
