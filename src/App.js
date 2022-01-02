import React from 'react';
import './App.css';
import Todos from './Todos/Todos';
import { Signin, Signup } from './User/User';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div class="Home-container">
      <h1 class="Home-title">Welcome to Todo Manger</h1>
      <h3 class="Home-authenticate">
        If you are a new user, <Link to="/signup">sign-up here</Link>
      </h3>
      <h3 class="Home-authenticate">
        If you are an existing user, <Link to="/signin">sign-in here</Link>
      </h3>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/todos" element={<Todos/>} />
      </Routes>
    </Router>
  )
}

export default App;
