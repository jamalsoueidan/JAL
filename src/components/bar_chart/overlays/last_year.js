import React from 'react';

export default class extends React.Component {
  render() {
    let { scaleY, scaleX, data, hide } = this.props

    if(hide) return null;
    if(!data.lastYear) return null;

    const nodes = data.bar.map((d,i) =>
      <rect key={i} x="0" height={scaleY.bandwidth()/2} y={scaleY(d._label)} width={scaleX(data.lastYear[i]._value)}></rect>
    )

    return(
      <g className="lastYear" transform="translate(1,0)">
        {nodes}
      </g>
    )
  }
}
