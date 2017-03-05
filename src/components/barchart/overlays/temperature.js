import React from 'react';
import * as d3 from 'd3';

export default class Temperature extends React.Component {
  componentDidMount() {
    this.renderPath();
  }

  componentDidUpdate() {
    this.renderPath();
  }

  reset() {
    let node  = this.refs.temperature;
    d3.select(node).select('path').remove();
    //d3.select(node).selectAll('circle').remove();
  }

  renderPath() {
    this.reset();

    let node  = this.refs.temperature;
    let { scaleY, scaleX, area, data, hide } = this.props
    if(hide) return null;

    let temperature = data.temperature;
    if(!data.temperature) return null;

    let consumption = data.consumption;
    let bars = consumption.bars

    let from = parseFloat(temperature.getAttr('_scale_bottom_value'))
    let to = parseFloat(temperature.getAttr('_scale_top_value'))

    let temperatureScaleX = d3.scaleLinear().range([0, data.consumption.top]).domain([from, to])
    console.log(temperature)

    let temperatureBars = temperature.bars.filter(d => {
      console.log(d._exp_ret_temp, d._time)
      return d._exp_ret_temp !== null
    })
    console.log(temperature.bars.length, bars.length, temperatureBars.length)
    let deletedBars = bars.length - temperatureBars.length

    let line = d3.line()
                 .curve(d3.curveCardinal)
                 .x( d => scaleX(temperatureScaleX(parseFloat(d._exp_ret_temp))))
                 .y( (d,i) => scaleY(bars[i+deletedBars]._label)+scaleY.bandwidth()/2);


    d3.select(node)
      .append('path')
      .datum(temperatureBars)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }

  render() {
    if(!this.props.data.temperature) return null;
    return(
      <g className="overlay temperature" transform="translate(1,0)" ref="temperature"></g>
    )
  }
}
