import React from 'react'

class Line extends React.Component {
  render() {
    let { data, height, scaleX, scaleY, hide } = this.props
    if(hide) return null;
    return(<line className="line" x1={scaleX(data)} y1={height} x2={scaleX(data)} y2="0" stroke="red" strokeWidth="2" strokeLinecap="butt" strokeOpacity="0.5"></line>)
  }
}

export default Line
