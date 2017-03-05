import React from 'react';

export default class extends React.Component {
  render() {
    let { scaleY, scaleX, data, hide } = this.props

    if(hide) return null;
    if(!data.lastYear) return null;

    let consumption = data.consumption;
    let bars = consumption.bars
    let lastYear = data.lastYear;

    const nodes = bars.map((d,i) =>
      <rect key={i} x="0" height={scaleY.bandwidth()/2} y={scaleY(d._label)} width={scaleX(lastYear.bars[i]['_value'])}></rect>
    )

    return(
      <g className="overlay lastYear" transform="translate(1,0)">
        {nodes}
      </g>
    )
  }
}
