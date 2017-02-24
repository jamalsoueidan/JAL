import React from 'react';
import * as d3 from 'd3';

export default class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    let node  = this.refs.axis;
    let axis;

    switch(this.props.orient) {
      case "bottom":
        axis = d3.axisBottom(this.props.scale)
        break;
      case "left":
        axis = d3.axisLeft(this.props.scale)
        break;
    }

    let ticks = this.props.ticks
    if(ticks) {
      axis = axis.ticks(ticks)
    }

    d3.select(node).call(axis)
  }

  render() {
    if(this.props.hide) return null;
    return(<g className="axis" ref="axis" transform={this.props.transform}></g>)
  }
}
