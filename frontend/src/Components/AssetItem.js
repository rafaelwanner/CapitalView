import React from 'react';
import '../static/css/Asset.css';



function AssetItem(props) {

  return(
    <div className="asset-item">
      <h4 className="cell">{props.asset.asset}</h4>
      <p className="cell">{props.asset.quantity} shares</p>
      <p>{props.asset.value}$</p>
    </div>
  )
}

export default AssetItem;
