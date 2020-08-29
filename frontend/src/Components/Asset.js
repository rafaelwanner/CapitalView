import React from 'react';
import AssetItem from './AssetItem';
import '../static/css/Asset.css';



function Asset(props) {

  const asset = props.asset.payload.map(item => <AssetItem key={item.asset} asset={item} />)

  return(
    <div className="asset">
      <h3>{props.asset.class}</h3>
      {asset}
    </div>
  )
}

export default Asset;
