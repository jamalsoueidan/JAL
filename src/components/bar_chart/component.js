import React, { PropTypes } from 'react'
import Area from './area'
import Axis from './axis'
import Rect from './rect'
import Text from './text'
import Line from './line'

import * as d3 from 'd3'
import * as json from './data'

class SVG extends React.Component {
  static defaultProps = {
    width: 500,
    height: 500,
    margins: {
      left: 40,
      right: 20,
      top: 20,
      bottom: 20
    },
    className: "svg",
    hideLine: true,
    hideText: true
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    margins: PropTypes.object,
    className: PropTypes.string,
    hideLine: PropTypes.bool,
    hideText: PropTypes.bool
  }

  render() {
    let { width, height, margins, className } = this.props
    let areaHeight = height - margins.top - margins.bottom;
    let areaWidth = width - margins.left - margins.right;

    let scaleX = d3.scaleLinear().range([0, innerWidth]).domain([0, 3000]);
    let scaleY = d3.scaleBand().range([innerHeight, 0]).domain(json.data.map(function(d) { return d._label; })).padding(0.1)

    return(
      <svg width={width} height={height} className={className}>
        <Area top={margins.top} right={margins.right} bottom={margins.bottom} left={margins.left}>
          <Axis scale={scaleX} orient="bottom" transform={"translate(0," + areaHeight + ")"} />
          <Axis scale={scaleY} orient="left"/>
          <Rect data={json.data} scaleX={scaleX} scaleY={scaleY} />
          <Line data={json.consumption._average} scaleX={scaleX} scaleY={scaleY} height={areaHeight} hide={this.props.hideLine}/>
          <Text data={json.data} scaleX={scaleX} scaleY={scaleY} hide={this.props.hideText} />
        </Area>
      </svg>
    )
  }
}

export default SVG
