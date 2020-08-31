import React, { useEffect, useState } from 'react';
import '../static/css/Overview.css';
import StatsDetail from './StatsDetail';
import HoldingsDetail from './HoldingsDetail';
import Calculating from './Calculating';
import Swal from 'sweetalert2';
import axios from 'axios';



function Detail(props) {

  const [holdings, setHoldings] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [value, setValue] = useState(0);
  const [asset, setAsset] = useState('');
  const [isCalculating, setIsCalculating] = useState(true);

  useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios(
              {
                method: 'get',
                url: '/api/detail/' + props.location.state,
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                }
              }
            );
            setHoldings(response.data.data[0].holdings);
            setQuantity(response.data.data[0].total_quantity);
            setValue(response.data.data[0].total_value);
            setAsset(response.data.data[0].asset);
            setIsCalculating(false);
          }
          catch (error) {
            Swal.fire({title: 'Oops...',
                       icon: 'error',
                       text: 'Error',
                       confirmButtonText: 'Try again'
          })
          setIsCalculating(false)
        };
      }

      fetchData();
      },
      [props.location.state, isCalculating]);

  if (isCalculating) {
    return <Calculating />;
  }
  else{
    return(
      <div className="detail">
        <h1>{props.location.state}</h1>
          <div className="detail-container">
            <div className="detail-wrapper">
              <StatsDetail value={value} quantity={quantity} />
              <HoldingsDetail data={holdings} asset={asset} />
            </div>
          </div>
      </div>
    )
  }
}

export default Detail;
