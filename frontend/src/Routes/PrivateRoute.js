import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Components/Loading'

function PrivateRoute({component: Component, call, ...rest}){

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({})

  useEffect(() => {
  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await axios(
        {
          url: 'http://127.0.0.1:5000/api/' + call,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
          }
        }
      );
      setData(result.data)
    }
    catch (error) {
      setIsError(true);
    }
    setIsLoading(false)

    };

  fetchData();
}, [call]);


   if (isLoading) {
     return <Loading />;
   }
   return(
     <Route
      {...rest}
      render ={ props => !(isError) ? (<Component {...props} data={data} />) : (<Redirect to = {{
                                                                pathname: '/login',
                                                                state: {from: props.location}
                                                           }}/> )

    }/>)
};

export default PrivateRoute;
