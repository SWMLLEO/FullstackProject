import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Admin from './pages/Admin'
import Challenges from './pages/Challenges';
import Contents from './pages/Contents';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/Home';

import data from './data'


function App() {
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(data['users'][0]));
    setCurrentUser(data['users'][0])
  }, [data]);

  return (
    <>
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/view"} className="nav-link">
                Challenges
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/contents"} className="nav-link">
                Contents
              </Link>
            </li>

          </div>
          <div className='navbar-nav ml-auto'>
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                {currentUser.firstname}
              </Link>
            </li>
          </div>


        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view" element={<Challenges />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contents" element={<Contents />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
