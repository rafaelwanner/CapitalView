import React from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import Swal from 'sweetalert2';


function Register() {

  function validate(values){
    axios({
      method: 'post',
      url: '/api/register',
      headers: {},
      data: values
      }).then(response => {
      const authToken = response.data.token;
      localStorage.setItem('authToken', authToken)
      Swal.fire({title: 'Welcome!',
                 icon: 'success',
                 text: response.data.message,
               }).then((result) => {
                  if (result.value) {
                    window.location.href = '/overview';
                  }
                });
      }).catch(error => {
        if (error.response.status === 409){
          Swal.fire({title: 'Oops...',
                     icon: 'error',
                     text: error.response.data.message
                    });
        }
        else{
          Swal.fire({title: 'Oops...',
                     icon: 'error',
                     text: 'Something went wrong'
                    });
        }
    });
  }


  return(
    <div className="form-container">
      <h1>Register</h1>
        <Formik
          initialValues={{
            name: '',
            username: '',
            password: ''
          }}
          onSubmit={values => {validate(values)}}
        >
          <div className="register-form">
            <Form>
              <div className="login-form field-form">
                <Field id="name" name="name" placeholder="Name" />
              </div>

              <div className="login-form field-form">
                <Field id="username" name="username" placeholder="Username" />
              </div>

              <div className="login-form field-form">
                <Field id="password" name="password" placeholder="Password" type="password" />
              </div>

              <button type="submit">Register</button>

            </Form>
          </div>
        </Formik>
    </div>

  )
}

export default Register;
