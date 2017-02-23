import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Area from './area'
import Axis from './axis'
import { Current, LastYear, Text, Average } from './overlays'

import * as d3 from 'd3'
import * as json from './data'

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
  }

  onResize() {
    let { width, height } = ReactDOM.findDOMNode(this).getBoundingClientRect()
    let ticks = 30;
    if(width < 1000) ticks = 15
    if(width < 500)  ticks = 5
    if(width < 250)  ticks = 1
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
    if(width === "100%") return null;

    let { margins } = this.props
    let areaHeight = height - margins.top - margins.bottom;
    let areaWidth = width - margins.left - margins.right;

    let scaleX = d3.scaleLinear().range([0, areaWidth]).domain([0, 3000]);
    let scaleY = d3.scaleBand().range([areaHeight, 0]).domain(json.data.map(function(d) { return d._label; })).padding(0.1)

    return(
      <Area top={margins.top} right={margins.right} bottom={margins.bottom} left={margins.left}>
        <Axis scale={scaleX} orient="bottom" transform={"translate(0," + areaHeight + ")"} ticks={ticks} />
        <Axis scale={scaleY} orient="left"/>
        <Current data={json.data} scaleX={scaleX} scaleY={scaleY} />
        <LastYear data={json.data} scaleX={scaleX} scaleY={scaleY} hide={this.props.hideLastYear} />
        <Average data={json.consumption._average} scaleX={scaleX} scaleY={scaleY} height={areaHeight} hide={this.props.hideAverage}/>
        <Text data={json.data} scaleX={scaleX} scaleY={scaleY} hide={this.props.hideText} />
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
  responsive: true
}

export default SVG
