import React from 'react';

export default class Text extends React.Component {
  render() {
    let { scaleX, scaleY, hide, data } = this.props

    if(hide) return null;

    // set fontSize
    let bandwidth = parseInt(scaleY.bandwidth())
    let fontSize =  bandwidth + "px"

    let consumption = data.consumption;
    let bars = consumption.bars

    const nodes = bars.map((d,i) =>
      <text key={i} x={scaleX(d._value)+4} y={scaleY(d._label)} dy=".8em" fontSize={fontSize}>{d._value || "?"}</text>
    )

    return(
      <g className="text">
        {nodes}
      </g>
    )
  }
}
