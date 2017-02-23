import React from 'react';

export default class Rect extends React.Component {
  render() {
    let { scaleY, scaleX } = this.props

    const nodes = this.props.data.map((d,i) =>
      <rect className="rect" key={i} x="0" height={scaleY.bandwidth()} y={scaleY(d._label)} width={scaleX(d._value)}></rect>
    )

    return(
      <g className="rect" ref="rect">
        {nodes}
      </g>
    )
  }
}
