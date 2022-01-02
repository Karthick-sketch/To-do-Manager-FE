import React from 'react';
import './App.css';
import Todos from './Todos/Todos';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Home() {
  return (
    <div class="Home-container">
      <h1 class="Home-title">Welcome to Todo Manger</h1>
      <h3 class="Home-authenticate">
        If you are a new user, sign-in here
      </h3>
      <h3 class="Home-authenticate">
        If you are an existing user, sign-in here
      </h3>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/todos" element={<Todos/>} />
      </Routes>
    </Router>
  )
}

export default App;
