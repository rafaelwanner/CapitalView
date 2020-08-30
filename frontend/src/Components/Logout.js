import React, {useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Redirect, Switch } from 'react-router';


function Logout(props) {


  useEffect(() => {
        axios({
          method: 'post',
          url: '/api/logout',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
          }
        }).then(response => {
            localStorage.removeItem('authToken')
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Logged out!',
              showConfirmButton: false,
              timer: 1500
            }).then(window.location.href = '/');
        }).catch(error => {
          localStorage.removeItem('authToken')
          window.location.href = '/';
        });
      },
      []);

      return(
        <Switch>
          <Redirect to={{ pathname: '/', state: {from: '/logout'}}} />
        </Switch>
      )
}

export default Logout;
