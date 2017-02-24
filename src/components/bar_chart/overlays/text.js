import React from 'react';

export default class Text extends React.Component {
  render() {
    let { scaleX, scaleY, hide } = this.props

    if(hide) return null;

    const nodes = this.props.data.map((d,i) =>
      <text key={i} x={scaleX(d._value)} y={scaleY(d._label)+(scaleY.bandwidth()/2)} dy="3px" fontSize="12px">{d._value || "?"}</text>
    )

    return(
      <g className="text">
        {nodes}
      </g>
    )
  }
}
