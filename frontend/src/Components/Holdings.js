import React from 'react';
import Asset from './Asset';


function Holdings(holdings) {

  const assets = holdings.data.map(item => <Asset key={item.class} asset={item} />)

  return(
    <div>
      <h1>Holdings</h1>
      {assets}
    </div>
  )
}

export default Holdings;
