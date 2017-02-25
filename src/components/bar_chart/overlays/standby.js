import React from 'react';

export default class extends React.Component {
  render() {
    let { scaleY, scaleX, data, hide } = this.props

    if(hide) return null;

    const nodes = data.bar.map((d,i) =>
      <rect key={i} x="1" height={scaleY.bandwidth()-2} y={scaleY(d._label)+1} width={(d._value ? scaleX(data.min)-2 : 0)}></rect>
    )

    return(
      <g className="standby" transform="translate(1,0)">
        {nodes}
      </g>
    )
  }
}
