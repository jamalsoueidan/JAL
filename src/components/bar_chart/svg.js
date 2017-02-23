import React from 'react'
import Area from './area'
import Axis from './axis'
import Rect from './rect'

import * as d3 from 'd3'
import * as json from './data'

class SVG extends React.Component {
  render() {
    let { width, height } = this.props;
    let innerHeight = height - 20 - 20;
    let innerWidth = width - 20 - 40;

    let scaleX = d3.scaleLinear().range([0, innerWidth]).domain([0, 3000]);
    let scaleY = d3.scaleBand().range([innerHeight, 0]).domain(json.data.map(function(d) { return d._label; })).padding(0.1)

    return(
      <svg width={width} height={height}>
        <Area top="20" right="20" bottom="20" left="40">
          <Axis transform={"translate(0," + innerHeight + ")"} scale={scaleX} orient="bottom"/>
          <Axis scale={scaleY} orient="left"/>
          <Rect data={json.data} scaleX={scaleX} scaleY={scaleY} />
        </Area>
      </svg>
    )
  }
}

export default SVG
