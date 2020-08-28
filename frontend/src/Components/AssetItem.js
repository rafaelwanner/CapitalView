import React from 'react';


function AssetItem(props) {

  return(
    <div>
      <h3>{props.asset.asset}</h3>
      <p>{props.asset.quantity}</p>
      <p>{props.asset.value}</p>
    </div>
  )
}

export default AssetItem;
