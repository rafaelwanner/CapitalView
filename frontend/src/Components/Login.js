import React from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import Swal from 'sweetalert2';


function Login() {

  function validate(values){
    axios({
      method: 'post',
      url: '/api/login',
      headers: {},
      data: values
      }).then(response => {
      const authToken = response.data.token;
      localStorage.setItem('authToken', authToken);
      window.location.href = '/overview';
      }).catch(error => {
        Swal.fire({title: 'Oops...',
                   icon: 'error',
                   text: error.response.data.message,
                   confirmButtonText: 'Try again',
                   footer: '<a href=/register>Register instead</a>)'
                  });
    });
  }


  return(
    <div>
      <h1>Login</h1>
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          onSubmit={values => {validate(values)}}
        >
          <Form>
            <label htmlFor="username">Username</label>
            <Field id="username" name="username" placeholder="Username" />

            <label htmlFor="password">Password</label>
            <Field id="password" name="password" placeholder="Password" type="password" />


            <button type="submit">Submit</button>
          </Form>
        </Formik>
    </div>

  )
}

export default Login;
