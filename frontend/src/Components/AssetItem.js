import React, { useState } from 'react';
import '../static/css/Asset.css';
import Detail from './Detail';
import { Redirect } from 'react-router';



function AssetItem(props) {

  const [redirect, setRedirect] = useState(false)

  function detail(){
    setRedirect(true)
  }

  if(redirect){
      return(
              <Redirect to={{pathname: '/detail', state: props.asset.asset}} component={Detail} />
      )
  }
  else{
    return(
      <div className="asset-item" onClick={detail}>
        <h4 className="cell">{props.asset.asset}</h4>
        <p className="cell">{props.asset.quantity} shares</p>
        <p>{props.asset.value}$</p>
      </div>
      )
    }
}

export default AssetItem;
