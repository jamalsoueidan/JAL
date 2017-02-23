import React from 'react';
import * as d3 from 'd3';

export default class Rect extends React.Component {
  render() {
    const rects = this.props.data.map((d,i) =>
      <rect className="rect" key={i} x="0" height={this.props.scaleY.bandwidth()} y={this.props.scaleY(d._label)} width={this.props.scaleX(d._value)}></rect>
    )

    return(
      <g className="rect" ref="rect">
        {rects}
      </g>
    )
  }
}
