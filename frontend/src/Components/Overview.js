import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calculating from './Calculating';
import Holdings from './Holdings';
import Stats from './Stats';
import Title from './Title';
import '../static/css/Overview.css';

function Overview(){
  const [holdings, setHoldings] = useState([]);
  const [stats, setStats] = useState([]);
  const [worth, setWorth] = useState([]);
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
                setStats(response.data.data.stats[1].fractions);
                setWorth(response.data.data.stats[0]);
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
    <div className="overview">
      <h1>Overview</h1>
        <div className="container">
          <Title data={worth} />
          <div className="content-wrapper">
            <Stats data={stats} />
            <Holdings data={holdings} />
          </div>
        </div>
    </div>
    )

};


export default Overview;
