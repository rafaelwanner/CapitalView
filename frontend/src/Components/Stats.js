import React from 'react';
import { Chart } from "react-google-charts";
import '../static/css/Overview.css';


function Stats(props) {

  var data = props.data.map(item => [item.class, item.payload[0]]);
  data = [['Asset Class', 'Capital']].concat(data);

  return(
    <div>
      <h1>Stats</h1>
        <div className="chart">
          <Chart
            width={'40vw'}
            height={'100vh'}
            alignItems={'flex-end'}
            justifyContent={'center'}
            chartType="PieChart"
            loader={<div>Loading Chart...</div>}
            data={data}
            options={{
              title: 'Distribution of capital',
              chartArea:{right:0,top:0,width:'70%',height:'70%'},
              legend: {position: 'bottom'}
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        </div>
    </div>
  )
}

export default Stats;
