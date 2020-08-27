import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {


  return(
    <div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to='/overview'>Overview</Link>
        </li>
      </ul>
    </div>

  )
}

export default Navbar;
