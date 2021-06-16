import React from 'react';
import firebase from '../firebase';
import moment from 'moment';
import AuthContext from './AuthContext/index';
import {Link} from 'react-router-dom';
function PostDetails(props) {
  const [post, setPost] = React.useState(null);
  const postId = props.match.params.postId;
  const postRef = firebase.collection('posts').doc(postId);
  const [comment, setComment] = React.useState('');
  const { authUser, firebaseAuth } = React.useContext(AuthContext);

  React.useEffect(() => {
    let issubscribed = true
    if ( issubscribed )
    {
      postRef.get().then((doc) => {
        setPost({ ...doc.data(), id: doc.id });
      });
      
    }
    return () =>
    {
      issubscribed = false;
    }
  }, [post,postRef]);

 
  

  //
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
  //

  const addComment = () => {
    postRef.get().then((doc) => {
      if (doc.exists) {
        const previousComments = doc.data().comments || [];
        const commentText = {
          postedBy: { id: '336', name: 'samadi' },
          created_at: Date.now(),
          text: comment,
        };
        const commentUpdated = [...previousComments, commentText];
        postRef.update({ comments: commentUpdated });
        setPost((prevState) => ({
          ...prevState,
          comments: commentUpdated,
        }));
        setComment('');
      }
    });
  };
  const renderPost = () => {
    return (
      post && (
        <div className="post-show">
          <div className="post-image-full">
            <img src={post.image} alt="" />
          </div>
          <div className="post-content">
            <h5 className="post-details">
              <span className="posted-by">{post.postedBy.name}</span>
              <span className="date">{moment(post.created_at).fromNow()}</span>
            </h5>
            <p className="post-body">{ post.body }</p>
            <div className="votes">
              <div className="up" onClick={() => voteUp(post.id)}>
                &#8593;
              </div>
              <div className="down" onClick={() => voteDown(post.id)}>
                &#8595;
              </div>
              <div className="count">{post.vote_count}</div>
            </div>
          
            <div className="comments">
              <h3>comments: {post.comments && post.comments.length}</h3>
            </div>
            {/* add comments form  */}
            {authUser ? (
              <>
                <textarea
                  className="form-control"
                  name=""
                  value={comment}
                  placeholder="comments"
                  onChange={(event) => setComment(event.target.value)}
                  cols="30"
                  rows="10"
                ></textarea>
                <div>
                  <button
                    onClick={() => addComment()}
                    className="btn btn-primary"
                  >
                    Add
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login">Connect to comment</Link>
            )}

            {post.comments &&
              post.comments.map((comment, index) => (
                <div key={index}>
                  <p className="comment-author">
                    {comment.postedBy.name} |{' '}
                    {moment(comment.created_at).format(
                      'MMMM Do YYYY, h:mm:ss a'
                    )}
                  </p>
                  <p className="comment">{comment.text}</p>
                </div>
              ))}
          </div>
        </div>
      )
    );
  };
  return <div>{renderPost()}</div>;
}
export default PostDetails;
