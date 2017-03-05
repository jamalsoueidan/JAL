import React from 'react';

export default class extends React.Component {
  render() {
    let { scaleY, scaleX, data, hide } = this.props

    if(hide) return null;
    if(!data.standby) return null;

    let consumption = data.consumption;
    let bars = consumption.bars

    const nodes = bars.map((d,i) =>
      <rect key={i} x="0" height={scaleY.bandwidth()-2} y={scaleY(d._label)+1} width={(d._value ? scaleX(consumption.min)-1 : 0)}></rect>
    )

    return(
      <g className="overlay standby" transform="translate(1,0)">
        {nodes}
      </g>
    )
  }
}
