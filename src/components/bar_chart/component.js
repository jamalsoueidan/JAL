import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Area from './area'
import Axis from './axis'
import { Current, LastYear, Text, Average, Standby } from './overlays'

import * as d3 from 'd3'

require('./stylesheet.css')

class SVG extends React.Component {
  constructor(props) {
    super(props)
    this.onResize = this.onResize.bind(this)
    this.state = {
      width: props.width,
      height: props.height,
      ticks: 30
    }
    this.setData();
  }

  setData() {
    this.consumption = this.props.data["ebutler"]['body']['graph']['consumption']
    this.max = parseFloat(this.consumption['_top'])
    let data = this.consumption['bar'];
    let reverse = []
    for(var i = data.length-1; i >= 0; i--) {
        reverse.push(data[i]);
    }
    this.min = d3.min(data, d => parseFloat(d._value))
    this.average = parseFloat(this.consumption['_average'])
    this.data = reverse;
  }

  onResize() {
    let { width, height } = ReactDOM.findDOMNode(this).getBoundingClientRect()
    let ticks = 30;
    if(width < 1000) ticks = 15
    if(width < 500)  ticks = 8
    if(width < 250)  ticks = 5
    this.setState({ width, height, ticks })
  }

  componentDidMount() {
    this.onResize();
    // maybe manager to handle all at once instead every SVG handle itself?
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    let { className, width, height } = this.props
    return(
      <svg width={width} height={height} className={className}>
        {this.renderArea()}
      </svg>
    )
  }

  renderArea() {
    let { width, height, ticks } = this.state

    // wait until we calculate width and height
    if(width === "100%" ) return null;

    let { margins } = this.props
    let areaHeight = height - margins.top - margins.bottom;
    let areaWidth = width - margins.left - margins.right;

    let scaleX = d3.scaleLinear().range([0, areaWidth]).domain([0, this.max]).nice();
    let scaleY = d3.scaleBand().range([areaHeight, 0]).domain(this.data.map(function(d) { return d._label; })).padding(0.1)

    let overLayAttributes = {
      data: this.data,
      scaleX: scaleX,
      scaleY: scaleY
    }

    return(
      <Area top={margins.top} right={margins.right} bottom={margins.bottom} left={margins.left}>
        <Axis scale={scaleX} orient="bottom" transform={"translate(0," + areaHeight + ")"} ticks={ticks} />
        <Axis scale={scaleY} orient="left"/>
        <Current {...overLayAttributes} />
        <LastYear hide={this.props.hideLastYear} {...overLayAttributes} />
        <Standby hide={this.props.hideStandby} min={this.min} {...overLayAttributes} />
        <Average height={areaHeight} hide={this.props.hideAverage} {...overLayAttributes} data={this.average} />
        <Text hide={this.props.hideText} {...overLayAttributes} />
      </Area>
    )
  }
}

SVG.propTypes = {
  responsive: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  margins: PropTypes.object,
  className: PropTypes.string,
  hideAverage: PropTypes.bool,
  hideText: PropTypes.bool,
  hideLastYear: PropTypes.bool,
  hideStandby: PropTypes.bool,
  data: PropTypes.object.isRequired
}

SVG.defaultProps = {
  width: "100%",
  height: "100%",
  margins: {
    left: 40,
    right: 20,
    top: 20,
    bottom: 20
  },
  className: "svg",
  hideAverage: true,
  hideText: true,
  hideLastYear: true,
  hideStandby: true,
  responsive: true
}

export default SVG
