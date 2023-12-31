import React, { useNavigate, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = ({navigate}) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userId, setId] = useState(window.localStorage.getItem("userId"));
  const [apiData, setData] = useState(window.localStorage.getItem("apiData"));

  // const navigate = useNavigate();

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("userId")
    window.localStorage.removeItem("apiData")
    setToken(null)
    setId(null)
    setData(null)
  }

  if (token) {
    return (
    <nav>
      <div className="logo">
        <Link to='/'>
          <img className="navImage" src='/gigguru-logo.png' alt="logo" />
        </Link>
      </div>
      <div className="title"> Gig Guru </div>
      <div className="nav-links">
        <Link to="/login">
          <button type="button" id="logout" onClick={logout}>Logout</button>
        </Link>
        <Link to="/account">
          <button type="button" id="account">Account</button>
        </Link>
      </div>
    </nav>
  );
    } else {
      return (
        <nav>
          <div className="logo">
            <Link to='/'>
              <img className="navImage" src='/gigguru-logo.png' alt="logo" />
            </Link>
          </div>
          <div className="title"> Gig Guru </div>
          <div className="nav-links">
            <Link to="/login">
              <button type="button" id="logout">Log in</button>
            </Link>
            <Link to="/signup">
              <button type="button" id="account">Sign up</button>
            </Link>
          </div>
        </nav>
      )
    }
};

export default Navbar;