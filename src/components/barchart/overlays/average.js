import React from 'react'

export default class extends React.Component {
  render() {
    let { data, area, scaleX, scaleY, hide } = this.props
    if(hide) return null;

    let consumption = data.consumption;
    let bars = consumption.bars

    let y2 = scaleY(bars[bars.length-1]._label)
    return(<line
      className="average"
      x1={scaleX(consumption.average)}
      y1={area.height}
      x2={scaleX(consumption.average)}
      y2={y2}
      stroke="red"
      strokeWidth="2"
      strokeLinecap="butt"
      strokeOpacity="0.5"></line>)
  }
}
