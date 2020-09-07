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
        <p className="cell">{Math.round((props.asset.quantity + Number.EPSILON) * 100) / 100} shares</p>
        <p>{Math.round((props.asset.value + Number.EPSILON) * 100) / 100}$</p>
      </div>
      )
    }
}

export default AssetItem;
