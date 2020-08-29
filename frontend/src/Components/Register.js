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
    <div>
      <h1>Register</h1>
        <Formik
          initialValues={{
            name: '',
            username: '',
            password: ''
          }}
          onSubmit={values => {validate(values)}}
        >
          <Form>
          <label htmlFor="name">Name</label>
          <Field id="name" name="name" placeholder="Name" />

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

export default Register;
