import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
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

  useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios(
              {
                url: '/api/overview',
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                }
              }
            );
            setHoldings(response.data.data.holdings);
            setStats(response.data.data.stats[1].fractions);
            setWorth(response.data.data.stats[0]);
            setIsCalculating(false);
          }
          catch (error) {
            Swal.fire({title: 'Oops...',
                       icon: 'error',
                       text: error.response.data.message,
                       confirmButtonText: 'Try again'
          })
          setIsCalculating(false)
        };
      }

      fetchData();
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
