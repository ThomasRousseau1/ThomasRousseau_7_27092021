// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Banner from './Banner'
import Signup from './Signup'
import Login  from './Login'
import Home from './Home'
import ProfileTest from './ProfileTest.js'
import Post from './Post'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { useHistory} from 'react-router-dom'
// import axios from 'axios'

// const api = axios.create ({
//     baseURL: `http://localhost:3000`
// })


function App() {

  // const AuthRoutes = () => {
  //   return (
  //   <div>
  //     <Banner />
  //       <Switch>
  //         <Route path="/home" component={Home} />
  //         <Route path="/profile" exact component={ProfileTest} />
  //         <Route path="/post" exact component={Post} />
  //       </Switch>
  //     </div>
  //   )
  // }

  // return ( 
  //   <Router>
  //         <Route path="/login" exact component={Login} />
  //         <Route path="/" exact component={Login} />
  //         <Route path="/signup" exact component={Signup} />
  //   </Router>
  // )
  return (
    <Router>
    <div className="App">
      <div className="content">
      {/* <Banner /> */}
      <Route path="/home" exact component={Banner} />
      <Route path="/profile" exact component={Banner} />
      <Route path="/login" exact component={Login} />
      <Route path="/" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      {/* <Post /> */}
      <Route path="/home" exact component={Post} />
      <Route path="/home" exact component={Home} />
      <Route path="/profile" exact component={ProfileTest} />
    </div>
      </div>
    </Router>
  );
}

export default App;
