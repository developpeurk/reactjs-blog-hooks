import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Posts from "./components/Posts"
import CreatePost from "./components/CreatePost"
import PostDetails from "./components/PostDetails"
import Header from "./components/Header"
import Login from "./components/Login"
import Register from "./components/Register"
function App() {
  return (

    <BrowserRouter>
      <div className="container">
        <Header />
        <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/create" exact component={CreatePost} />
          <Route path="/post/:postId" exact component={PostDetails} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
    </div>
    </BrowserRouter>
  )
}

export default App;
