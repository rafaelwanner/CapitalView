import React from 'react';
import { Redirect, Switch } from 'react-router';
import Detail from './Detail';


function Temporary(props) {


      return(
        <Switch>
          <Redirect to={{ pathname: '/detail', state: props.location.state}} component={Detail} />
        </Switch>
      )
}

export default Temporary;
