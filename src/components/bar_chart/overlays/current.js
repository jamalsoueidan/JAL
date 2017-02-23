import React from 'react';

export default class extends React.Component {
  render() {
    let { scaleY, scaleX, data } = this.props

    const nodes = data.map((d,i) =>
      <rect className="rect" key={i} x="0" height={scaleY.bandwidth()} y={scaleY(d._label)} width={scaleX(d._value)}></rect>
    )

    return(
      <g className="current">
        {nodes}
      </g>
    )
  }
}
