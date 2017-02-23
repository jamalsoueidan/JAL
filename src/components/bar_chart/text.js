import React from 'react';

export default class Text extends React.Component {
  render() {
    let { scaleX, scaleY } = this.props

    const nodes = this.props.data.map((d,i) =>
      <text key={i} className="value" x={scaleX(d._value)+1} y={scaleY(d._label)+(scaleY.bandwidth()/2)} dy="3px" fontSize="12px">{d._value}</text>
    )

    return(
      <g className="text" ref="text">
        {nodes}
      </g>
    )
  }
}
