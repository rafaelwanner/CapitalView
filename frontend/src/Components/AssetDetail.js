import React, { useState } from 'react';
import '../static/css/Asset.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import Temporary from './Temporary';
import { Redirect } from 'react-router';

function AssetDetail(props) {

  const [redirect, setRedirect] = useState(false);

  function editAsset(){
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Quantity',
        text: 'Enter new quantity'
      },
      {
        title: 'Price',
        text: 'Enter the price you paid for the asset'
      }
    ]).then((result) => {
      if (result.value) {
          const quantity = result.value[0];
          const price = result.value[1];
          if (isNaN(price)){
            Swal.fire({title: 'Invalid price',
                       icon: 'error',
                       text: 'Please enter a number...'
                      });
          }
          else if (isNaN(quantity)) {
            Swal.fire({title: 'Invalid quantity',
                       icon: 'error',
                       text: 'Please enter a number...'
                      });

          }
          axios({
            method: 'post',
            url: '/api/edit',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            data: {
                   id: props.asset.id,
                   quantity: quantity,
                   price: price
                }
            }).then(response => {
            Swal.fire({title: 'Success!',
                       icon: 'success',
                       text: 'Asset updated successfully!',
                     }).then((result) => {
                        if (result.value) {
                          console.log('redirect');
                          setRedirect(true); //doesnt redirect
                        }
                      });
            }).catch(error => {
                Swal.fire({title: 'Oops...',
                           icon: 'error',
                           text: 'Something went wrong'
                          });

          });
        }
      })
    }


  function deleteAsset(){
    Swal.fire({title: 'Delete',
               icon: 'question',
               text: 'Are you sure you want to delete this asset?',
               confirmButtonText: 'Yes',
               showCancelButton: true,
               cancelButtonText: 'Cancel'})
        .then((result) => {
               if (result.value) {
                 axios({
                   method: 'get',
                   url: '/api/delete_asset/' + props.asset.id,
                   headers: {
                     'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                   }
                   }).then(response => {
                     Swal.fire({title: 'Success',
                                text: 'Asset deleted!',
                                icon: 'success',
                                confirmButtonText: 'Ok'
                     }).then((result) => {
                        if (result.value) {
                          console.log('redirect');
                          setRedirect(true);
                        }
                      });
                   }).catch(error => {
                     Swal.fire({title: 'Oops...',
                                icon: 'error',
                                text: 'Something went wrong',
                                confirmButtonText: 'Try again'
                               });
                 });

               }
             }
  )}

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

    if(redirect){
      console.log('in');
      return(
        <Redirect to={{pathname: '/temp', state: props.name}} component={Temporary} />
      )
    }
    else{
      return(
        <div style={style} className="asset-detail-item">
          <div className="asset-detail-title">
            <p className="cell-title">Bought on {props.asset.date} for {props.asset.price}$ per share</p>
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
            <div className="asset-detail-columns">
              <button className="center" type="submit" onClick={editAsset}>Edit</button>
              <button className="center" type="submit" onClick={deleteAsset}>Delete</button>
            </div>
          </div>
        </div>
        )
    }

}

export default AssetDetail;
