import React from 'react';
import BarChart from 'bar_chart'

require('./stylesheet.css')

var sampleData = [
  {id: '5fbmzmtc', x: 7, y: 41, z: 6},
  {id: 's4f8phwm', x: 11, y: 45, z: 9}
];

var domain = {x: [0, 30], y: [0, 100] }

export default class extends React.Component {
  render() {
    return(
      <div>
        <BarChart
          data={sampleData}
          domain={domain} />
      </div>
    )
  }
}
