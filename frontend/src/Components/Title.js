import React from 'react';



function Title(props) {

  return(
    <div>
      <h1>Net Worth: {Math.round((props.data.net_worth + Number.EPSILON) * 100) / 100}$</h1>
    </div>
  )
}

export default Title;
