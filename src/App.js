import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Posts from "./components/Posts"
import CreatePost from "./components/CreatePost"
import PostDetails from "./components/PostDetails"
import Header from "./components/Header"
import Login from "./components/Login"
import Register from "./components/Register"
import { firebaseAuth } from './firebase';
import React from 'react';
import AuthContext from './components/AuthContext/index';
import Search from './components/Search';
function App() {
  const [authUser, setAuthUser] = React.useState(null);
  React.useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
        // console.log(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="container">
        <AuthContext.Provider value={{ authUser, firebaseAuth }}>
          <Header />
          <Switch>
            <Route path="/" exact component={Posts} />
            <Route path="/create" exact component={CreatePost} />
            <Route path="/post/:postId" exact component={PostDetails} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/search" exact component={Search} />
          </Switch>
        </AuthContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
