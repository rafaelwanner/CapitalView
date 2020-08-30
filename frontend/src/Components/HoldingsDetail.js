import React from 'react';
import AssetDetail from './AssetDetail';
import '../static/css/Overview.css';


function HoldingsDetail(props) {

  const assets = props.data.map(item => <AssetDetail key={item.id} asset={item} />)

  return(
    <div>
      <h2>Holdings</h2>
        <div className="holdings-detail">
          {assets}
        </div>
    </div>
  )
}

export default HoldingsDetail;
