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
    let { scaleY, scaleX, area, data } = this.props

    let cooling = data.cooling;
    if(!cooling) return null;

    let consumption = data.consumption;
    let bars = consumption.bars

    //let top = parseFloat(cooling.getAttr('_evaluation_value').substr(0, 5))
    //let coolingScaleX = d3.scaleLinear().range([0, 9.0]).domain([0, cooling.max])

    let line = d3.line().curve(d3.curveMonotoneX)
                        .x( d => {
                          return scaleX(parseFloat(d._value))
                        })
                        .y( d => {
                          return (scaleY(d._label)+scaleY.bandwidth()/2)
                        });
    d3.select(node)
      .append('path')
      .datum(bars)
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
