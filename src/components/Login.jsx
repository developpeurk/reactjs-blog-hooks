import React from 'react';
import { firebaseAuth } from '../firebase';
function Login({ history }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [userCredentials, setUserCredentials] = React.useState({
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
    login(userCredentials);
    setUserCredentials({
      email: '',
      password: '',
    });
  };

  const login = ({ email, password }) => {
    const loggedUser = firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((userLogged) => {
        return userLogged;
      });

    console.log(loggedUser);
    history.push('/');
  };

  return (
    <div className="form-container">
      <h2 className="register-form-title">Connexion</h2>
      <form onSubmit={handleFormSubmit}>
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

export default Login;