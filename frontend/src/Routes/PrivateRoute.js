import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Components/Loading'

function PrivateRoute({component: Component, ...rest}){

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState([])

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
        setResponse(result.data)
      }
      catch (error) {
        setIsError(true);
      }
      setIsLoading(false)
      };
    fetchData();
  }, []);


   if (isLoading) {
     return <Loading />;
   }
   return(
     <Route
      {...rest}
      render ={ props => !(isError) ? (<Component {...response} {...props} />) : (<Redirect to = {{
                                                                pathname: '/login',
                                                                state: {from: props.location}
                                                           }}/> )

    }/>)
};

export default PrivateRoute;
