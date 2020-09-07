import React from 'react';
import '../static/css/Overview.css';



function StatsDetail(props) {


    return(
      <div className="stats-detail">
        <p className="stats-cell">Total value: {Math.round((props.value + Number.EPSILON) * 100) / 100}</p>
        <p className="stats-cell">Total quantity: {Math.round((props.quantity + Number.EPSILON) * 100) / 100} shares</p>
      </div>
      )

}

export default StatsDetail;
