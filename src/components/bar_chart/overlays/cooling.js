import React from 'react';
import * as d3 from 'd3';

export default class Cooling extends React.Component {
  componentDidMount() {
    this.renderPath();
  }

  componentDidUpdate() {
    this.renderPath();
  }

  renderPath() {
    let node  = this.refs.cooling;
    let { scaleY, scaleX, data } = this.props

    //let coolingScaleX = d3.scaleLinear().range([0, area.width]).domain([0, this.data.top]).nice();

    let line = d3.line().curve(d3.curveMonotoneX)
                        .x(function(d) {
                          return scaleX(d._value)
                        })
                        .y(function(d) { return scaleY(d._label) });
    d3.select(node)
      .append('path')
      .datum(data.cooling)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }

  render() {
    if(!this.props.data.cooling) return null;
    return(
      <g className="cooling" transform="translate(1,0)" ref="cooling"></g>
    )
  }
}
