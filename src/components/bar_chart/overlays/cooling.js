import React from 'react';
import * as d3 from 'd3';

export default class Cooling extends React.Component {
  componentDidMount() {
    this.renderPath();
  }

  componentDidUpdate() {
    let node  = this.refs.cooling;
    d3.select(node).select('path').remove();
    d3.select(node).selectAll('circle').remove();
    this.renderPath();
  }

  renderPath() {
    let node  = this.refs.cooling;
    let { scaleY, scaleX, area, data, hide } = this.props
    if(hide) return null;

    let cooling = data.cooling;
    if(!cooling) return null;

    let consumption = data.consumption;
    let bars = consumption.bars

    let from = parseFloat(cooling.getAttr('_scale_bottom_value'))
    let to = parseFloat(cooling.getAttr('_scale_top_value'))
    let coolingScaleX = d3.scaleLinear().range([0, data.consumption.top]).domain([from, to])
    let coolingBars = cooling.bars.filter(d => d._value)

    let deletedBars = cooling.bars.length - coolingBars.length

    let line = d3.line()
                 .curve(d3.curveCardinal)
                 .x( d => scaleX(coolingScaleX(parseFloat(d._value))))
                 .y( (d,i) => scaleY(bars[i+deletedBars]._label)+scaleY.bandwidth()/2);


    d3.select(node)
      .append('path')
      .datum(coolingBars)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    d3.select(node)
      .selectAll("circle")
      .data(coolingBars)
      .enter()
      .append("circle")
      .attr("cx", d => scaleX(coolingScaleX(parseFloat(d._value))))
      .attr("cy", (d,i) => scaleY(bars[i+deletedBars]._label)+scaleY.bandwidth()/2 )
      .attr("r", 1.5)
      .style("fill", "red");
  }

  render() {
    if(!this.props.data.cooling) return null;
    return(
      <g className="overlay cooling" transform="translate(1,0)" ref="cooling"></g>
    )
  }
}
