import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import Swal from 'sweetalert2';
import Loading from './Loading';
import { SelectField } from './SelectField';
import '../static/css/Form.css';


function Add(props) {

  const [stocks, setStocks] = useState([]);
  const [crypto, setCrypto] = useState([]);
  const [fiat, setFiat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [chosen, setChosen] = useState([]);

  useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios(
              {
                method: 'get',
                url: '/api/assets',
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                }
              }
            );
            setStocks(response.data.assets['Stocks']);
            setCrypto(response.data.assets['Cryptocurrency']);
            setFiat(response.data.assets['Fiat currency']);
            setIsLoading(false);
          }
          catch (error) {
            if (error.response.status === 401 || error.response.status === 422){
              window.location.href = '/login';
            }
            else{
              Swal.fire({title: 'Oops...',
                         icon: 'error',
                         text: error.response.data.message,
                         confirmButtonText: 'Try again'
              });
          }
          setIsLoading(false)
        };
      }
      fetchData();
      },
      []);

      function validate(values){
        console.log(values)

        if (isNaN(values.quantity)){
          Swal.fire({title: 'Invalid quantity',
                     icon: 'error',
                     text: 'Please enter a number...'
                    });


        }
        else{
          axios({
            method: 'post',
            url: '/api/add_asset',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            data: values
            }).then(response => {
              Swal.fire({title: 'Success!' ,
                         icon: 'success',
                         text: values.asset + ' added!'
                       }).then((result) => {
                          if (result.value) {
                            window.location.href = '/overview';
                          }
                        });
            }).catch(error => {
              Swal.fire({title: 'Oops...',
                         icon: 'error',
                         text: error.response.data.message,
                         confirmButtonText: 'Try again',
                         footer: '<a href=/register>Register instead</a>)'
                        });
          });
        }
      }

      function checkDisable(value){
        if (value === 'Stocks'){
          setChosen(stocks)
          setDisabled(false);
          console.log('value set');
        }
        else if (value === 'Cryptocurrency'){
          setChosen(crypto)
          setDisabled(false);
          console.log('value set');
        }
        else if (value === 'Fiat currency'){
          setChosen(fiat);
          setDisabled(false);
          console.log('value set');
        }
        else{
          setDisabled(true);
          console.log('value unset');
        }

      }



      if (isLoading) {
        return <Loading />;
      }
      return(
        <div className="add">
          <h1>Add</h1>
          <div className="form-container">
              <Formik
                initialValues={{
                  asset_class: '',
                  asset: '',
                  quantity: ''
                }}
                onSubmit={values => {validate(values)}}
              >
                <div className="register-form">
                  <Form>
                    <div className="login-form field-select">
                      <Field id='asset_class' name='asset_class' list={false} validate={value => checkDisable(value)} component={SelectField}
                      options={[  { value: '', label: '' },
                                  { value: 'Stocks', label: 'Stocks' },
                                  { value: 'Cryptocurrency', label: 'Cryptocurrency' },
                                  { value: 'Fiat currency', label: 'Fiat currency' }
                                  ]} />
                    </div>

                    <div className="login-form field-select">
                      <Field id='asset' name='asset' list={true} component={SelectField} disabled={disabled}
                      options={ chosen } />
                    </div>

                    <div className="login-form field-select">
                      <Field id='quantity' name='quantity' disabled={disabled} placeholder="Quantity" />
                    </div>


                    <button type="submit">Add</button>

                  </Form>
                </div>
              </Formik>
          </div>

        </div>
      )

};

export default Add;
