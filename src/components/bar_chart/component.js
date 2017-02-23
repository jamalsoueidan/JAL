import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Area from './area'
import Axis from './axis'
import Rect from './rect'
import Text from './text'
import Line from './line'

import * as d3 from 'd3'
import * as json from './data'

export default class SVG extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: props.width,
      height: props.height,
      ticks: 15
    }
    this.onResize = this.onResize.bind(this)
  }

  static defaultProps = {
    width: "500",
    height: "500",
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
    width: PropTypes.string,
    height: PropTypes.string,
    margins: PropTypes.object,
    className: PropTypes.string,
    hideLine: PropTypes.bool,
    hideText: PropTypes.bool
  }

  onResize() {
    let { width, height } = ReactDOM.findDOMNode(this).getBoundingClientRect()
    let ticks = 5;
    if(width > 500) ticks = 10
    if(width > 1000) ticks = 15
    this.setState({ width, height, ticks })
  }

  componentDidMount() {
    let { width } = this.state
    if (width === "100%" ) {
      this.onResize();
      window.addEventListener('resize', this.onResize);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    let { className } = this.props
    
    return(
      <svg width="100%" height="100%" className={className}>
        {this.renderArea()}
      </svg>
    )
  }

  renderArea() {
    let { width, height } = this.state
    // if width is 100% we need to figure out the width in pixel,
    // so wait on componentDidMount, just return empty SVG!
    if( width === "100%" ) return null;

    let { margins } = this.props
    let areaHeight = height - margins.top - margins.bottom;
    let areaWidth = width - margins.left - margins.right;

    let scaleX = d3.scaleLinear().range([0, areaWidth]).domain([0, 3000]);
    let scaleY = d3.scaleBand().range([areaHeight, 0]).domain(json.data.map(function(d) { return d._label; })).padding(0.1)

    return(
      <Area top={margins.top} right={margins.right} bottom={margins.bottom} left={margins.left}>
        <Axis scale={scaleX} orient="bottom" transform={"translate(0," + areaHeight + ")"} ticks={this.state.ticks} />
        <Axis scale={scaleY} orient="left"/>
        <Rect data={json.data} scaleX={scaleX} scaleY={scaleY} />
        <Line data={json.consumption._average} scaleX={scaleX} scaleY={scaleY} height={areaHeight} hide={this.props.hideLine}/>
        <Text data={json.data} scaleX={scaleX} scaleY={scaleY} hide={this.props.hideText} />
      </Area>
    )
  }
}
