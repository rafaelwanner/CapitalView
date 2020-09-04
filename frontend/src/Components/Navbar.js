import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Headroom from 'react-headroom';
import logo from '../static/images/logo192.png';
import '../static/css/Navbar.css';

function Navbar() {

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          {
            url: '/api/is_authorized',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
          }
        );
        setIsAuthorized(true);
      }
      catch (error) {
        setIsAuthorized(false);
      }
      };
    fetchData();
  }, []);

  if (!isAuthorized){

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
