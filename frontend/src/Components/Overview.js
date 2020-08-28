import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calculating from './Calculating';
import Holdings from './Holdings';
import Stats from './Stats'

function Overview(){
  const [holdings, setHoldings] = useState([]);
  const [stats, setStats] = useState([]);
  const [isCalculating, setIsCalculating] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
        axios({
          method: 'get',
          url: '/api/overview',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
          }
        }).then(response => {
                setHoldings(response.data.data.holdings);
                setStats(response.data.data.stats);
        }).catch(error => {
                setIsError(true)
        });

      setIsCalculating(false);
      },
      []);

  if (isCalculating) {
    return <Calculating />;
  }
  return(
    <div>
      <h1>Overview</h1>
      <Stats data={stats} />
      <Holdings data={holdings} />
    </div>
    )

};


export default Overview;
