import React from 'react';
import '../static/css/Asset.css';



function AssetDetail(props) {

  let style = {}
  let font = {}
  if(props.asset.gain > 0){
    style = {'borderRight': '7px solid #7CF293'};
    font = {'color': '#7CF293'};
  }
  else{
    style = {'borderRight': '7px solid #E4737B'};
    font = {'color': '#E4737B'};
  }

    return(
      <div style={style} className="asset-detail-item">
        <div className="asset-detail-title">
          <p className="cell-title">Bought on <h4 className="cell-title">{props.asset.date}</h4> for {props.asset.price}$ per share</p>
        </div>
        <div className="asset-detail-rows">
          <div className="asset-detail-columns">
            <p className="cel">Quantity: {props.asset.quantity} shares</p>
            <p className="cel">Current Price: {props.asset.current_price}$</p>
          </div>
          <div className="asset-detail-columns">
            <p style={font} className="cel">Gain: {Math.round((props.asset.gain + Number.EPSILON) * 100) / 100}$</p>
            <p style={font} className="cel">Gain in Percent: {props.asset.gain_percent}%</p>
          </div>
        </div>
      </div>
      )

}

export default AssetDetail;
