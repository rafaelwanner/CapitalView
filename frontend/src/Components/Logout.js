import React, {useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


function Logout(props) {

  useEffect(() => {
        axios({
          method: 'post',
          url: '/api/logout',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
          }
        }).then(response => {
            window.location.href = '/';
            localStorage.removeItem('authToken')

        }).catch(error => {
          Swal.fire({title: 'Oops...',
                     icon: 'error',
                     text: error.response.data.msg,
                     confirmButtonText: 'Try again',
                     footer: '<a href=/register>Register instead</a>)'
                    });
        });
      },
      []);

  return(
    <div>
      <h1>Logout</h1>
    </div>
  )
}

export default Logout;
