import React from 'react';
import AssetItem from './AssetItem';


function Asset(props) {

  const asset = props.asset.payload.map(item => <AssetItem key={item.asset} asset={item} />)

  return(
    <div>
    <p>{props.asset.class}</p>
    {asset}
    </div>
  )
}

export default Asset;
