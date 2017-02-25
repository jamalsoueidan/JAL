import React from 'react';

export default class extends React.Component {
  render() {
    let { scaleY, scaleX, data, hide } = this.props

    if(hide) return null;

    const nodes = data.bar.map((d,i) =>
      <rect key={i} x="0" height={scaleY.bandwidth()/2} y={scaleY(d._label)} width={scaleX(d._value)*1.5}></rect>
    )

    return(
      <g className="lastYear" transform="translate(1,0)">
        {nodes}
      </g>
    )
  }
}
