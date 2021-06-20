import React from 'react';
import { firebaseAuth } from '../firebase';
function Register({ history }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [firebaseError, setFirebaseError] = React.useState(null);

  const [userCredentials, setUserCredentials] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    setUserCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
  };


  const checkServerErrors = () =>
  {
    if ( firebaseError !=null )
    {
      if ( firebaseError == "auth/email-already-in-use" )
        {
        return(  <p className="error-text">Email exists</p>
        )
        
      }
      if ( firebaseError == "auth/weak-password" )
        {
        return(  <p className="error-text">password is weak *<small style={{color:'blue'}}>password > 6</small> </p>
        )
        
      }
     
    
    }
  }

  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    register(userCredentials);
    setUserCredentials({
      name: '',
      email: '',
      password: '',
    });
  };

  const register = ({ name, email, password }) => {
    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCreated) => {
        userCreated.user.updateProfile({
          displayName: name,
        } );
        //console.log(newUser);
        history.push('/');
        
      })
      .catch((error) => setFirebaseError(error.code));
  
  };

  return (
    <div className="form-container">
       {checkServerErrors()}
      <h2 className="register-form-title">Inscription</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          required
          className="form-control"
          placeholder="full name"
          autoComplete="off"
          value={userCredentials.name}
          onChange={handleInputChange}
        />
        <input
          required
          className="form-control"
          placeholder="Email"
          autoComplete="off"
          value={userCredentials.email}
          onChange={handleInputChange}
          type="email"
          name="email"
        />
        <input
          type="password"
          required
          className="form-control"
          placeholder="password"
          autoComplete="off"
          value={userCredentials.password}
          onChange={handleInputChange}
          name="password"
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

export default Register;