import React from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import Swal from 'sweetalert2';
import '../static/css/Form.css';

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
                   footer: '<a href=/register>Register instead</a>'
                  });
    });
  }


  return(
    <div className="form-container">
      <h1>Login</h1>
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          onSubmit={values => {validate(values)}}
        >
        <div className="login-form">
          <Form >
            <div className="login-form">
              <div className="field-form">
                <Field id="username" name="username" placeholder="Username" />
              </div>
              <div className="field-form">
                <Field id="password" name="password" placeholder="Password" type="password" />
              </div>
              <button className="center" type="submit">Login</button>
            </div>
          </Form>
        </div>
        </Formik>
    </div>

  )
}

export default Login;
