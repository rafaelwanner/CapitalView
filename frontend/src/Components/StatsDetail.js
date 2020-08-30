import React from 'react';
import '../static/css/Overview.css';



function StatsDetail(props) {


    return(
      <div className="stats-detail">
        <p className="stats-cell">Total value: {props.value}</p>
        <p className="stats-cell">Total quantity: {props.quantity} shares</p>
      </div>
      )

}

export default StatsDetail;
