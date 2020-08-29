import React from 'react';
import { Link } from 'react-router-dom';
import Headroom from 'react-headroom';
import logo from '../static/images/logo192.png';
import '../static/css/Navbar.css';

function Navbar() {

  if (localStorage.getItem("authToken") === null){

    return(
      <Headroom style={{background: '#fff'}}>
        <div className="navBar">

          <a href='/'>
            <img className="logo" src={logo} alt="Logo" href='/' />
          </a>

          <div className="nav-links">
            <ul>
            </ul>
            <ul>
            </ul>
            <ul>
              <Link className="link-element" to='/login'>Login</Link>
            </ul>
          </div>

        </div>
      </Headroom>
    )
  }
  else{
    return(
      <Headroom style={{background: '#fff'}}>
        <div className="navBar">

          <a href='/'>
            <img className="logo" src={logo} alt="Logo" href='/' />
          </a>

          <div className="nav-links">
            <ul>
              <Link className="link-element" to='/overview'>Overview</Link>
            </ul>
            <ul>
              <Link className="link-element" to='/add'>Add asset</Link>
            </ul>
            <ul>
              <Link className="link-element" to='/logout'>Logout</Link>
            </ul>
          </div>

        </div>
      </Headroom>
    )
    }
}

export default Navbar;
