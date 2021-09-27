// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Banner from './Banner'
import Home from './Home'
import Signup from './Signup'
import Login  from './Login'
import Post from './Post'
import ProfileTest from './ProfileTest.js'
import { Route, Link } from "react-router-dom";
import { useHistory} from 'react-router-dom'
import axios from 'axios'

const api = axios.create ({
    baseURL: `http://localhost:3000`
})




function App() {

  return (
    <div className="App">
      <Route path="/login" exact component={Login} />
      <Route path="/" exact component={Home} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/post" exact component={Post} />
      <Route path="/profile" exact component={ProfileTest} />
    </div>
  );
}

export default App;
