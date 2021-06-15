import React from 'react';
import { firebaseAuth } from '../firebase';
function Register({ history }) {
  const [submitted, setSubmitted] = React.useState(false);
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
    const newUser = firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCreated) => {
        userCreated.user.updateProfile({
          displayName: name,
        });
        return userCreated;
      });
    console.log(newUser);
    history.push('/');
  };

  return (
    <div className="form-container">
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