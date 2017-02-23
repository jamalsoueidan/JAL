import React from 'react';

export default class extends React.Component {
  render() {
    let { scaleY, scaleX, data, hide, min } = this.props

    if(hide) return null;

    const nodes = data.map((d,i) =>
      <rect key={i} x="0" height={scaleY.bandwidth()-2} y={scaleY(d._label)+1} width={(d._value ? scaleX(min) : 0)}></rect>
    )

    return(
      <g className="standby">
        {nodes}
      </g>
    )
  }
}
