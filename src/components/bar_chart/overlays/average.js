import React from 'react'

export default class extends React.Component {
  render() {
    let { data, area, scaleX, scaleY, hide, } = this.props

    if(hide) return null;
    let y2 = scaleY(data.bar[data.bar.length-1]._label)
    return(<line className="line" x1={scaleX(data.average)} y1={area.height} x2={scaleX(data.average)} y2={y2} stroke="red" strokeWidth="2" strokeLinecap="butt" strokeOpacity="0.5"></line>)
  }
}
